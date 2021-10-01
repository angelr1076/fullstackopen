import React from 'react';
import Button from 'react-bootstrap/Button';

const TestBlog = ({ blog, onClick, toggleVisibility }) => {
  return (
    <div className='blogDetails'>
      {blog.title} {blog.author}
      <div className='likes' onClick={onClick}>
        {blog.likes} likes
        <Button type='submit'>Like</Button> {blog.likes} Likes
      </div>
      <div className='toggleItem' onClick={toggleVisibility}>
        <Button type='submit'>Show</Button>
        <div className='url'>{blog.url}</div>
      </div>
    </div>
  );
};

export default TestBlog;
