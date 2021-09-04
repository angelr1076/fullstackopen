import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setURL] = useState('');

  const addBlog = event => {
    event.preventDefault();
    createBlog({
      title,
      author,
      url,
    });

    setTitle('');
    setAuthor('');
    setURL('');
  };

  return (
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={addBlog}>
        <input
          type='text'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder='Enter Title'
        />
        <input
          type='text'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder='Enter Author'
        />
        <input
          type='text'
          value={title}
          onChange={({ target }) => setURL(target.value)}
          placeholder='Enter URL'
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default BlogForm;
