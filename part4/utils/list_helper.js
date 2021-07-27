const dummy = blogs => {
  blogs = 1;
  return blogs;
};

const totalLikes = blogs => {
  return blogs.reduce((sum, blogs) => sum + blogs.likes, 0);
};

const favoriteBlog = blogs => {
  return blogs.reduce((max, obj) => {
    console.log('max likes = ', max);
    // obj.likes > max.likes ? obj : max;
  });
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
