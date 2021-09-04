import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const LoginForm = ({
  handleSubmit,
   handleUsernameChange,
   handlePasswordChange,
   username,
   password
}) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group className='mb-3' controlId='formBasicUser'>
      <Form.Label>Username</Form.Label>
      <Form.Control
        type='text'
        value={username}
        name='Username'
        onChange={handleUsernameChange}
        placeholder='Enter username'
      />
      <Form.Text className='text-muted'></Form.Text>
    </Form.Group>

    <Form.Group className='mb-3' controlId='formBasicPassword'>
      <Form.Label>Password</Form.Label>
      <Form.Control
        type='password'
        value={password}
        name='Password'
        onChange={handlePasswordChange}
        placeholder='Password'
      />
    </Form.Group>
    <Button variant='primary' type='submit'>
      Login
    </Button>
  </Form>
);

export default LoginForm;
