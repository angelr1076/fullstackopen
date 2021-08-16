const dummy = blogs => {
    blogs = 1;
    return blogs;
};

const totalLikes = blogs => {
    return blogs.reduce((sum, blogs) => sum + blogs.likes, 0);
};

const favoriteBlog = blogs => {
    const initialValue = [];
    if (blogs.length === 0) {
        return {};
    } else {
        const maxLikes = blogs.reduce((total, current) => {
            return total.concat(
                Array.isArray(current) ? favoriteBlog(current.likes) : current.likes
            );
        }, initialValue);
        return Math.max(...maxLikes);
    }
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
};