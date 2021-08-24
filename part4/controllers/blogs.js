const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post('/', async(request, response, next) => {
    const body = request.body;
    const token = request.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decodedToken.id);

    if (body.title === undefined || body.url === undefined) {
        return response.status(400).end();
    }

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
    });

    try {
        const savedBlog = await blog.save();
        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save();
        response.json(savedBlog);
    } catch (exception) {
        next(exception);
    }
});

blogsRouter.delete('/:id', async(request, response, next) => {
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