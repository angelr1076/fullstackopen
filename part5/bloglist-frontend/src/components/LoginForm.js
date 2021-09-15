import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
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
      <Button variant='primary mb-3' type='submit'>
        Login
      </Button>
    </Form>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
