const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', (request, response, next) => {
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

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body;

  const blog = {
    likes: body.likes,
  };

  // Update command
  Blog.findByIdAndUpdate(request.params.id, blog)
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON());
      response.status(204).end();
    })
    .catch(error => next(error));
});

module.exports = blogsRouter;
