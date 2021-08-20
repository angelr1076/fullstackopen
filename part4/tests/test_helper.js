const _ = require('lodash');
const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [{
        title: 'My first blog',
        author: 'Angel Rodriguez',
        url: 'https://www.angelrod.dev',
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
    {
        title: 'My first years',
        author: 'E Rodriguez',
        url: 'https://www.angelrod.dev',
        likes: 15,
        id: '60ff5d5baf4d677086ba555a',
    },
    {
        title: 'My second blog',
        author: 'Angel Rodriguez',
        url: 'https://www.angelrod.dev',
        likes: 2,
        id: '60ff5d5baf4d677086ba666a',
    },
    {
        title: 'My third blog',
        author: 'Angel Rodriguez',
        url: 'https://www.angelrod.dev',
        likes: 0,
        id: '60ff5d5baf4d677086ba777a',
    },
];

const blogsInDb = async() => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
};

// const mostBlogs = async() => {
//     return _.maxBy(blogsInDb(), 'likes');
// };

const usersInDb = async() => {
    const users = await User.find({});
    return users.map(u => u.toJSON());
};

module.exports = {
    initialBlogs,
    blogsInDb,
    // mostBlogs,
    usersInDb,
};