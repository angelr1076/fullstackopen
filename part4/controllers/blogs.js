const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);

  if (blog.title === undefined || blog.url === undefined) {
    return response.status(400).end();
  }

  blog
    .save()
    .then(result => {
      response.status(201).json(result);
    })
    .catch(error => next(error));
});

module.exports = blogsRouter;
