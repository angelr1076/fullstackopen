const dummy = blogs => {
  blogs = 1;
  return blogs;
};

const totalLikes = blogs => {
  return blogs.reduce((sum, blogs) => sum + blogs.likes, 0);
};

module.exports = {
  dummy,
  totalLikes,
};
