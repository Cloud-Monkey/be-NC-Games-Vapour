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
