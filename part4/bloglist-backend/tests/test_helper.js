const _ = require('lodash');
const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'https://www.cs.utexas.edu/users/EWD/indexBibTeX.html',
    likes: 12,
    id: '60ff5d5baf4d677086ba444a',
  },
  {
    title: 'My first blog',
    author: 'Angel Rodriguez',
    url: 'https://www.angelrod.dev',
    likes: 0,
    id: '60fb343d2eee5352db9429c6',
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

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const mostLikes = async () => {
  const blogs = await Blog.find({});
  return _.maxBy(blogs, 'likes');
};

const mostBlogs = async () => {
  const blogs = await Blog.find({});
  const allBlogs = blogs.map(blog => blog.toJSON());

  const highestCount = allBlogs.reduce((obj, blog) => {
    obj[blog.author] = obj[blog.author] ? obj[blog.author] + 1 : 1;
    return obj;
  }, {});

  Object.entries(highestCount).forEach(entry => {
    const [author, count] = entry;
    console.log(`${author} = ${count}`);
  });
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  mostLikes,
  mostBlogs,
  usersInDb,
};
