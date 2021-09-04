import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const Blog = ({ blog }) => (
  <div>
    <ListGroup variant className='m-3'>
      <ListGroup.Item>{blog.title} </ListGroup.Item>
      <ListGroup.Item>{blog.author}</ListGroup.Item>
      <ListGroup.Item>{blog.url}</ListGroup.Item>
      <Button style={{ width: '25%' }} variant='info'>View</Button>
      <Button style={{ width: '25%' }} variant='warning'>Hide</Button>
      <hr
        style={{
          color: 'black',
          backgroundColor: 'black',
          height: 2,
        }}
      />
    </ListGroup>
  </div>
);

export default Blog;
