const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
});

blogsRouter.post('/', async(request, response, next) => {
    // const blog = new Blog(request.body);
    const body = request.body;

    const user = await User.findById(body.userId);

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
    });

    if (blog.title === undefined || blog.url === undefined) {
        return response.status(400).end();
    }

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.json(savedBlog);
});

blogsRouter.delete('/:id', async(request, response) => {
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