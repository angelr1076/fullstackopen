const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const helper = require('./test_helper');

beforeEach(async() => {
    await Blog.deleteMany({});

    let blogObject = new Blog(helper.initialBlogs[0]);
    await blogObject.save();

    blogObject = new Blog(helper.initialBlogs[1]);
    await blogObject.save();
});

test('blogs are returned as json', async() => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
}, 100000);

test('there are two blogs', async() => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(2);
});

test('unique identifier is id', async() => {
    const blogs = await Blog.find({});
    expect(blogs[0]._id).toBeDefined();
});

afterAll(() => {
    mongoose.connection.close();
});