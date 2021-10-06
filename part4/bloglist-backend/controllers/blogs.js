const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');
const middleware = require('../utils/middleware');

blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post(
    '/',
    middleware.userExtractor,
    async(request, response, next) => {
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
            user: user._id,
        });

        try {
            const savedBlog = await blog.save();
            user.blogs = user.blogs.concat(savedBlog);
            await user.save();
            response.json(savedBlog);
        } catch (exception) {
            next(exception);
        }
    }
);

blogsRouter.delete(
    '/:id',
    middleware.userExtractor,
    async(request, response, next) => {
        const token = request.token;
        const decodedToken = jwt.verify(token, process.env.SECRET);
        const blog = await Blog.findById(request.params.id);

        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' });
        }

        if (blog.user.toString() === decodedToken.id.toString()) {
            try {
                await Blog.findByIdAndRemove(request.params.id);
                response.status(204).json(`${request.params.id} deleted from blogs`);
            } catch (exception) {
                next(exception);
            }
        } else {
            response.status(401).json({ error: 'unauthorized attempt to delete' });
        }
    }
);

blogsRouter.put('/:id', async(request, response, next) => {
    const body = request.body;

    const blog = {
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes,
    };

    try {
        // Update command
        const editedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
            new: true,
        });
        editedBlog.toJSON();
    } catch (exception) {
        next(exception);
    }
});

module.exports = blogsRouter;