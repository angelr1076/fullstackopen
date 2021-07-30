const dummy = blogs => {
    blogs = 1;
    return blogs;
};

const totalLikes = blogs => {
    return blogs.reduce((sum, blogs) => sum + blogs.likes, 0);
};

const favoriteBlog = blogs => {
    return blogs.length === 0 ?
        {} :
        blogs.reduce(
            (previous, next) => (next.likes > previous ? next.likes : previous),
            blogs[0].likes,
        );
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
};