const db = require("../db/connection");
const app = require("../app");
const request = require("supertest");
const test_data = require("../db/data/test-data");
// const dev_data = require("../db/data/development-data");
const seed = require("../db/seeds/seed");

beforeEach(() => seed(test_data));

afterAll(() => db.end());

describe('200: GET', () => {
    it('should respond with a json containing an array of categories that have the properties of slug and description', () => {
        return request(app)
        .get('/api/categories')
        .expect(200)
        .then(({ body }) => {
            const { categories } = body;
            expect(categories).toBeInstanceOf(Array);
            expect(categories.length).toBe(4);
            categories.forEach((category) => {
                expect(category).toMatchObject({
                  slug: expect.any(String),
                  description: expect.any(String)
                });
            });
        });
    });
});
describe('404: ALL', () => {
    it('should respond wih a 404 not found error with error message if incorrect path given', () => {
        return request(app)
        .get('/api/catagories')
        .expect(404)
        .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe('Error: not found');
        });
    });
});
describe('200: GET', () => {
    it('should respond with a json containing a review array that has the defined properties', () => {
        return request(app)
        .get('/api/reviews/1')
        .expect(200)
        .then(({ body }) => {
            const { review } = body;
            expect(review).toBeInstanceOf(Array);
            expect(review.length).toBe(1);
            review.forEach((review) => {
                expect(review).toMatchObject({
                review_id: 1,
                title: expect.any(String),
                review_body: expect.any(String),
                designer: expect.any(String),
                review_img_url: expect.any(String),
                votes: expect.any(Number),
                category: expect.any(String),
                owner: expect.any(String),
                created_at: expect.any(String),
                });
            });
        });
    });
    it('should respond with a 400 error when provided a bad/invalid id', () => {
        return request(app)
        .get('/api/reviews/banana')
        .expect(400)
        .then(({ body }) => {
            expect(body).toEqual({ msg: "Invalid request!" });
            });
        });
    });
    it('should respond with a 404 not found error when provided a valid ID that doesnt exist', () => {
        return request(app)
        .get('/api/reviews/999999')
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toEqual("ID does not exist, please use a valid ID");
            });
    });
describe('200: GET', () => {
    it('should respond with a json containing an array of review objects that has the defined properties', () => {
        return request(app)
        .get('/api/reviews')
        .expect(200)
        .then(({ body }) => {
            const { review } = body;
            expect(review).toBeInstanceOf(Array);
            expect(review.length).toBe(13);
            expect(review).toBeSortedBy("created_at", {
                descending: true })
            review.forEach((review) => {
                expect(review).toMatchObject({
                owner: expect.any(String),
                title: expect.any(String),
                review_id: expect.any(Number),
                category: expect.any(String),
                review_img_url: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                designer: expect.any(String),
                comment_count: expect.any(Number),
                });
            });
        });
    });
    it('should respond wih a 404 not found error with error message if incorrect path given', () => {
        return request(app)
        .get('/api/revews')
        .expect(404)
        .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe('Error: not found');
        });
    });
});
describe('200: GET', () => {
    it('should respond with a json array of comments for the given review_id of which each comment should have the defined properties', () => {
        return request(app)
        .get('/api/reviews/2/comments')
        .expect(200)
        .then(({ body }) => {
            const { comments } = body;
            expect(comments).toBeInstanceOf(Array);
            expect(comments.length).toBe(3);
            comments.forEach((comments) => {
                expect(comments).toMatchObject({
                    comment_id: expect.any(Number),
                    votes: expect.any(Number),
                    created_at: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String),
                    review_id: 2,
                });
            });
        });
    });
    it('should respond with a 400 if an invalid review_id is given', () => {
        return request(app)
        .get('/api/reviews/reviews/comments')
        .expect(400)
        .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe('Invalid request!');
        });
    });
    it('should respond with a 404 if there are no comments associated with that review_id', () => {
        return request(app)
        .get('/api/reviews/1/comments')
        .expect(404)
        .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe('There are currently no comments for this review.');
        });
    });
    it('should respond with a 404 if there is no review associated with that review_id', () => {
        return request(app)
        .get('/api/reviews/1000/comments')
        .expect(404)
        .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe('ID does not exist, please use a valid ID');
        });
    });
});
describe('201: POST Request body accepts an object with the following properties, body, username', () => {
    it('should return a 201 and an should post the comment object to the comment table in database', () => {
        const requestBody = {
            body: 'This is one of the best board games ever!',
            username: 'bainesface',
        };
        return request(app)
        .post('/api/reviews/1/comments')
        .send(requestBody)
        .expect(201)
        .then(({ body }) => {
            expect(body).toMatchObject({
                author: expect.any(String),
                body: expect.any(String),
                comment_id: expect.any(Number),
                created_at: expect.any(String),
                votes: expect.any(Number),
            });
        });
    });
    it('should respond with a 400 if there is no comment in body value in the posted object', () => {
        const requestBody = {
            body: '',
            username: 'bainesface',
        };
        return request(app)
        .post('/api/reviews/1/comments')
        .send(requestBody)
        .expect(400)
        .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe('No comment given')
        });
    });
    it('should respond with a 400 if there is no body key in the posted object', () => {
        const requestBody = {
            username: 'bainesface',
        };
        return request(app)
        .post('/api/reviews/1/comments')
        .send(requestBody)
        .expect(400)
        .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe('No comment given')
        });
    });
    it('should respond with a 400 if there is no value in the username in the posted object', () => {
        const requestBody = {
            body: 'This is one of the best board games ever!',
            username: '',
        };
        return request(app)
        .post('/api/reviews/1/comments')
        .send(requestBody)
        .expect(400)
        .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe('Username has not been given')
        });
    });
    it('should respond with a 400 if there is no username key in the posted object', () => {
        const requestBody = {
            body: 'This is one of the best board games ever!',
        };
        return request(app)
        .post('/api/reviews/1/comments')
        .send(requestBody)
        .expect(400)
        .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe('Username has not been given')
        });
    });
    it('should respond with a 400 if the review_id is valid but too high', () => {
        const requestBody = {
            body: 'This is one of the best board games ever!',
            username: 'bainesface',
        };
        return request(app)
        .post('/api/reviews/1000/comments')
        .send(requestBody)
        .expect(400)
        .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe('Invalid request!')
        });
    });
    it('should respond with a 400 if the review_id is invalid', () => {
        const requestBody = {
            body: 'This is one of the best board games ever!',
            username: 'bainesface',
        };
        return request(app)
        .post('/api/reviews/mango/comments')
        .send(requestBody)
        .expect(400)
        .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe('Invalid request!')
        });
    });
    it('should respond with a 400 if the author is invalid', () => {
        const requestBody = {
            body: 'This is one of the best board games ever!',
            username: 'RonniePickering',
        };
        return request(app)
        .post('/api/reviews/1/comments')
        .send(requestBody)
        .expect(400)
        .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe('Author is not valid')
        });
    });
});

