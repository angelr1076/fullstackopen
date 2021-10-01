import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [author, setAuthor] = useState('');

  const handleChange = (event) => {
    setAuthor(event.target.value)
  };

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      author: author
    });

    setAuthor('')
  };

  return (
    <div className="formDiv">      
    <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <input
          id='author'
          value={author}
          onChange={handleChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
};

export default BlogForm;