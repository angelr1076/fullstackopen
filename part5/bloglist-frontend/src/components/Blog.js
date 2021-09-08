import React, { useState } from 'react';
// import blogService from '../services/blogs';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const buttonStyle = {
    width: '60px',
    marginTop: '5px',
    color: 'white',
  };

  const hrStyle = {
    color: 'black',
    backgroundColor: 'black',
    height: 2,
  };

  const [visible, setVisible] = useState(false);
  const [blogObject, setBlogObject] = useState(blog);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const likeBlog = () => {
    let likes = blogObject.likes + 1;
    // Make a copy of the blog object and pass new likes count
    const editedBlog = { ...blogObject, likes };
    updateBlog(editedBlog);
    setBlogObject(editedBlog);
  };

  const removeBlog = () => {
    deleteBlog(blog)
  };

  return (
    <div>
      <ListGroup variant className='m-3'>
        <div style={hideWhenVisible}>
          <ListGroup.Item>{blog.title} </ListGroup.Item>
          <Button
            onClick={toggleVisibility}
            style={buttonStyle}
            variant='primary'
          >
            View
          </Button>
        </div>
        <div style={showWhenVisible}>
          <ListGroup.Item>{blog.title} </ListGroup.Item>
          <ListGroup.Item>{blog.url}</ListGroup.Item>
          <ListGroup.Item>{blog.author}</ListGroup.Item>
          <ListGroup.Item>
            <Button
              variant='success'
              type='submit'
              style={{ marginLeft: '8px' }}
              onClick={likeBlog}
            >
              {blogObject.likes} likes
            </Button>
            <Button
              variant='danger'
              type='submit'
              style={{ marginLeft: '10px', color: 'white' }}
              onClick={removeBlog}
            >
              Remove
            </Button>
          </ListGroup.Item>
          <Button
            onClick={toggleVisibility}
            style={buttonStyle}
            variant='secondary'
          >
            Hide
          </Button>
        </div>
        <hr style={hrStyle} />
      </ListGroup>
    </div>
  );
};

export default Blog;
