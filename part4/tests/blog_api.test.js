const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const helper = require('./test_helper');

jest.setTimeout(20000);

// Add describe statements

beforeEach(async() => {
    await Blog.deleteMany({});

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
    const promiseArray = blogObjects.map(blog => blog.save());
    await Promise.all(promiseArray);
}, 20000);

describe('return blog entries attributes', () => {
    test('blogs are returned as json', async() => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('there are five blogs', async() => {
        const response = await api.get('/api/blogs');
        expect(response.body).toHaveLength(5);
    });

    test('the first entry is about string reduction', async() => {
        const blogs = await Blog.find({});
        expect(blogs[0].title).toBe('Canonical string reduction');
    });

    test('unique identifier is id', async() => {
        const blogs = await Blog.find({});
        expect(blogs[0]._id).toBeDefined();
    });
});

describe('when a blog entry is created', () => {
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
            blog => blog.title === 'This is an object',
        );
        console.log('blog posted: ', findBlogPost);
        const likes = findBlogPost.likes;
        expect(likes).toBe(0);
    });

    test('if the title and url are missing respond with status code 400', async() => {
        const newBlog = {
            author: 'Not Me',
            likes: 5,
        };

        await api.post('/api/blogs').send(newBlog).expect(400);
        const allBlogs = await helper.blogsInDb();
        expect(allBlogs).toHaveLength(helper.initialBlogs.length);
    });
});

describe('modifying a blog post', () => {
    test('succeeds with status code 204 if id is valid', async() => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToDelete = blogsAtStart[0];

        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

        const title = blogsAtEnd.map(b => b.title);
        expect(title).not.toContain(blogToDelete.title);
    });
});

test('returns the author who has the largest amount of blogs', async() => {
    console.log(helper.mostBlogs());
});

afterAll(() => {
    mongoose.connection.close();
});