const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post(
  '/',
  middleware.userExtractor,
  async (request, response, next) => {
    const body = request.body;
    const token = request.token;
    const user = request.user;
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (body.title === undefined || body.url === undefined) {
      return response.status(400).json({ error: 'missing body and/or url' });
    }

    if (!token || !decodedToken.id) {
      return response
        .status(401)
        .json({ error: 'token is missing or is invalid' });
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id,
    });

    try {
      const savedBlog = await blog.save();
      user.blogs = user.blogs.concat(savedBlog);
      await user.save();
      response.json(savedBlog);
    } catch (exception) {
      next(exception);
    }
  },
);

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response, next) => {
    const token = request.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    try {
      const blog = await Blog.findById(request.params.id);

      if (blog.user.toString() === decodedToken.id.toString()) {
        await Blog.findByIdAndRemove(request.params.id);
        response.status(204).json(`${request.params.id} deleted from blogs`);
      } else {
        response.status(401).json({ error: 'unauthorized attempt to delete' });
      }
    } catch (exception) {
      next(exception);
    }
  },
);

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
