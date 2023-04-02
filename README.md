# Northcoders House of Games API

## Env Setup

We'll have two databases in this project. One for real looking dev data and another for simpler test data.

You will need to create two .env files for your project: .env.test and .env.development. Into each, add PGDATABASE=<database_name_here>, with the correct database name for that environment (see /db/setup.sql for the database names). Double check that these .env files are .gitignored.

You'll need to run npm install at this point - Please do not install specific packages as you can do this down the line when you need them.

You have also been provided with a db folder with some data, a setup.sql file and a seeds folder.

Please take some to familiarise yourself with the project structure. The seed function has been written for you, but you should take a look at the table creations to see the structure of the database you'll be working with. You should also take a minute to familiarise yourself with the npm scripts you have been provided.

The job of index.js in each the data folders is to export out all the data from that folder, currently stored in separate files. This is so that, when you need access to the data elsewhere, you can write one convenient require statement - to the index file, rather than having to require each file individually. Think of it like a index of a book - a place to refer to! Make sure the index file exports an object with values of the data from that folder with the keys:

categoryData
reviewData
userData
commentData

## functions on the api

- GET /api/categories
- A request that can be made by the client that will respopnd with an array of all the category objects, each of which should have the following properties: [slug, description].

- GET /api/reviews/:review_id
- A request that can be made by the client that will respond with a review object containing properties {
  review_id
  title
  review_body
  designer
  review_img_url
  votes
  category
  owner
  created_at
  } where the :review_id placeholder will be replaced with a number of a review to return to the client.

- GET /api/reviews
- A request that can be made by the client that will respond a reviews array of review objects, the reviews should be sorted by date in descending order, each of which should have the following properties: [{
- owner
- title
- review_id
- category
- review_img_url
- created_at
- votes
- designer
- comment_count }]

**comment_count** is the total count of all the comments with this review_id - you should make use of queries to the database in order to achieve this.

- GET /api/reviews/:review_id/comments
- A request that can be made by the client that Responds with
  an array of comments for the given review_id of which each comment should have the following properties:

- comment_id
- votes
- created_at
- author
- body
- review_id

**comments** should be served with the most recent comments first

- POST /api/reviews/:review_id/comments
- A request that the client can make containing an object with data to be posted to the database with the following properties:
  {
- username
- body
  }
  **Responds with**
  The posted comment and the status code should be 201 which signifies that something was created.
