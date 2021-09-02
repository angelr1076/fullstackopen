import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'

const App = () => {
  // All blogs display
  const [blogs, setBlogs] = useState([]);
  // Set blog properties
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setURL] = useState('');

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');

  // Set class color for messages
  const [messageClass, setMessageClass] = useState('');

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  // Save the details of a logged-in user to the local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = event => {
    event.preventDefault();

    const blogObject = {
      user,
      title,
      author,
      url,
    };

    blogService.create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog));
      console.log(returnedBlog);
      setTitle('');
      setAuthor('');
      setURL('');
      setMessage(`New blog added "${returnedBlog.title}! by ${returnedBlog.author}"`);
      setMessageClass('success');

      setTimeout(() => {
        setMessage(null);
        setMessageClass('none');
      }, 3000);
    });
  };

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      setMessage('Logged in successfully');
      setMessageClass('success');

      setTimeout(() => {
        setMessage(null);
        setMessageClass('none');
      }, 3000);
    } catch (exception) {
      setMessage('Wrong credentials');
      setMessageClass('error');
      setTimeout(() => {
        setMessage(null);
        setMessageClass('none');
      }, 3000);
    }
  };

  const handleLogOut = async event => {
    event.preventDefault();
    try {
      window.localStorage.removeItem('loggedBlogappUser');
      setUser(null);
      setMessage('Logged out successfully');
      setMessageClass('success');
      setTimeout(() => {
        setMessage(null);
        setMessageClass('none');
      }, 3000);
    } catch (exception) {
      setMessage('Error trying to log you out');
      setMessageClass('error');
      setTimeout(() => {
        setMessage(null);
        setMessageClass('none');
      }, 3000);
    }
  };

  const loginForm = () => (
    <Form onSubmit={handleLogin}>
      <Form.Group className='mb-3' controlId='formBasicUser'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
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
          onChange={({ target }) => setPassword(target.value)}
          placeholder='Password'
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );

  const blogForm = () => (
     <Form onSubmit={addBlog}>
      <Form.Group className='mb-3' controlId='formBasicEntry'>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type='text'
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)}
          placeholder='Enter Title'
        />
        <Form.Text className='text-muted'></Form.Text>
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicEntry'>
        <Form.Label>Author</Form.Label>
        <Form.Control
          type='text'
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)}
          placeholder='Author'
        />
      </Form.Group>
       <Form.Group className='mb-3' controlId='formBasicEntry'>
        <Form.Label>URL</Form.Label>
        <Form.Control
          type='text'
          value={url}
          name='URL'
          onChange={({ target }) => setURL(target.value)}
          placeholder='URL'
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );

  const logOutForm = () => (
    <form onSubmit={handleLogOut}>
      <Button variant='info' type='submit' style={{ color: 'white' }}>
        Logout
      </Button>
    </form>
  );

  if (user === null) {
    return (
      <div>
        <p className={messageClass}>{message}</p>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    );
  }

  return (
    <div>
    <Container>
      <p className={messageClass}>{message}</p>
      
      <p>{user.name} is logged in </p>
      {logOutForm()}
      <hr />
      <br />
      {blogForm()}
      <hr />
      <ul>
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
      </Container>
    </div>
  );
};

export default App;
