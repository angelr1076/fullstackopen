import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
    <div className='blogForm'>
      <h2>Add a new blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Group className='mb-3' controlId='formTitle'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formAuthor'>
          <Form.Label>Author</Form.Label>
          <Form.Control
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formURL'>
          <Form.Label>URL</Form.Label>
          <Form.Control
            type='text'
            value={url}
            onChange={({ target }) => setURL(target.value)}
            required
          />
        </Form.Group>
        <Button variant='primary mb-3' type='submit'>
          Save
        </Button>
      </Form>
    </div>
  );
};

export default BlogForm;
