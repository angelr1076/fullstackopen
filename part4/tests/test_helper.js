const Blog = require('../models/blog');

const initialBlogs = [{
        title: 'My first blog',
        author: 'Angel Rodriguez',
        url: 'http://localhost3003/api/blogs',
        likes: 0,
        id: '60fb343d2eee5352db9429c6',
    },
    {
        title: 'My new blog',
        author: 'Elorah Rodriguez',
        url: 'http://localhost3003/api/blogs',
        id: '60fb343d2eee5352db947890',
    },
    {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'https://www.cs.utexas.edu/users/EWD/indexBibTeX.html',
        likes: 12,
        id: '60ff5d5baf4d677086ba444a',
    },
];

const blogsInDb = async() => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
};

const likesPropertyEmpty = async() => {
    const blogs = await Blog.find({});
    return blogs.filter(blog => (blog.hasOwnProperty('likes') ? null : blog));
};

module.exports = {
    initialBlogs,
    blogsInDb,
    likesPropertyEmpty,
};