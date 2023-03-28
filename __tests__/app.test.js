const db = require("../db/connection");
const app = require("../app");
const request = require("supertest");
const test_data = require("../db/data/test-data");
// const dev_data = require("../db/data/development-data");
const seed = require("../db/seeds/seed");
const getReviewById = require("../controllers/getReviewsById.controller");

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
            expect(body).toEqual({ msg: "Invalid ID!" });
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
