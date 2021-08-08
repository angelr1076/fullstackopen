const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

const initialBlog = [
  {
    title: 'My first blog',
    author: 'Angel Rodriguez',
    url: 'http://localhost3003/api/blogs',
    likes: 0,
    id: '60fb343d2eee5352db9429c6',
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'https://www.cs.utexas.edu/users/EWD/indexBibTeX.html',
    likes: 12,
    id: '60ff5d5baf4d677086ba444a',
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(initialBlog[0]);
  await blogObject.save();

  blogObject = new Blog(initialBlog[1]);
  await blogObject.save();
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(2);
});

test('unique identifier is id', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0]._id).toBe();
});

afterAll(() => {
  mongoose.connection.close();
});
