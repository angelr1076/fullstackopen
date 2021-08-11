const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const blog = require('../models/blog');
const api = supertest(app);
const Blog = require('../models/blog');
const helper = require('./test_helper');

beforeEach(async() => {
    await Blog.deleteMany({});

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
    const promiseArray = blogObjects.map(blog => blog.save());
    await Promise.all(promiseArray);
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

test('the first note is about my first blog', async() => {
    const blogs = await Blog.find({});
    expect(blogs[0].title).toBe('My first blog');
});

test('unique identifier is id', async() => {
    const blogs = await Blog.find({});
    expect(blogs[0]._id).toBeDefined();
});

test('a blog post can be created', async() => {
    const newBlog = {
        title: 'This is not Python',
        author: 'Anonymous',
        url: 'https://www.firebase.com/sample',
        likes: 6,
    };

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    const titles = blogsAtEnd.map(blog => blog.title);
    expect(titles).toContain('This is not Python');
});

test('default likes to 0 if empty', async() => {
    const newBlog = {
        title: 'This is an object',
        author: 'Tazer',
        url: 'https://www.netlify.com/sample',
    };

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const blogPost = await helper.blogsInDb();
    const findBlogPost = await helper.blogsInDb.find(
        blog => blog.author === 'Tazer'
    );
    console.log('blog posted: ', findBlogPost);

    expect(findBlogPost.likes).toBe(0);
});

afterAll(() => {
    mongoose.connection.close();
});