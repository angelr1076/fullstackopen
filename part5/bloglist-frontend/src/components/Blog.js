import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const Blog = ({ blog, blogName, user, updateBlog, deleteBlog }) => {
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
    deleteBlog(blog);
  };

  return (
    <div>
      <ListGroup variant className='blogItem m-3'>
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
          <ListGroup.Item>Title: {blog.title} </ListGroup.Item>
          <ListGroup.Item className='urlItem'>URL: {blog.url}</ListGroup.Item>
          <ListGroup.Item>Author: {blog.author}</ListGroup.Item>
          <ListGroup.Item>Posted By: {blogName}</ListGroup.Item>
          {/* <ListGroup.Item>User: {user}</ListGroup.Item> */}
          <ListGroup.Item className='likesItem' onClick={likeBlog}>
            <Button
              variant='success'
              type='submit'
              style={{ marginLeft: '8px' }}
            >
            Like
            </Button>
            {' '} {blogObject.likes} {' '} Likes 
            </ListGroup.Item>
            <ListGroup.Item className='removeItem' onClick={removeBlog}>
            
              {blogName === user ? 
            <Button
              variant='outline-danger'
              type='submit'
              style={{ marginLeft: '20px' }}
            >
              Delete
            </Button>
            : ''
            }
          </ListGroup.Item>
          <ListGroup.Item className='toggleItem' onClick={toggleVisibility}>
          <Button
            style={buttonStyle}
            variant='secondary'
            type='submit'
          >
            Hide
          </Button>
        </ListGroup.Item>
        </div>
        <hr style={hrStyle} />
      </ListGroup>
    </div>
  );
};

export default Blog;
