const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const helper = require('./test_helper');

beforeEach(async() => {
    await Blog.deleteMany({});

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
    const promiseArray = blogObjects.map(blog => blog.save());
    await Promise.all(promiseArray);
}, 5000);

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
        title: 'hegemony is the key to leadership',
        author: 'Anonymous',
        url: 'https://www.google.com/sample',
        likes: 4,
    };

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const allBlogs = await helper.blogsInDb();
    expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1);
    const titles = allBlogs.map(blog => blog.title);
    expect(titles).toContainEqual('hegemony is the key to leadership');
});

test('if the title and url properties are missing respond with the status code 400 Bad Request', async() => {
    const newBlog = {
        author: 'Not Me',
        likes: 5,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
});

test('default likes to 0 if likes property is empty', async() => {
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

    const blogPosts = await helper.blogsInDb();
    const findBlogPost = await blogPosts.find(
        blog => blog.title === 'This is an object'
    );
    console.log('blog posted: ', findBlogPost);
    const likes = findBlogPost.likes;
    expect(likes).toBe(0);
});

afterAll(() => {
    mongoose.connection.close();
});