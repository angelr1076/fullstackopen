import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';

const App = () => {
  // All blogs display
  const [blogs, setBlogs] = useState([]);
  const [loginVisible, setLoginVisible] = useState(false)
  // Set blog properties
  // const [title, setTitle] = useState('');
  // const [author, setAuthor] = useState('');
  // const [url, setURL] = useState('');

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

  const addBlog = blogObject => {
  
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog));
        console.log(returnedBlog);
        setMessage(
          `New blog added "${returnedBlog.title}! by ${returnedBlog.author}"`
        );
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

   const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <Button variant='secondary' onClick={() => setLoginVisible(true)}>
            Log In
          </Button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <Button variant='secondary' onClick={() => setLoginVisible(false)}>
            Cancel
          </Button>
        </div>
      </div>
    )
  }

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



  const logOutForm = () => (
    <form onSubmit={handleLogOut}>
      <Button variant='info' type='submit' style={{ color: 'white' }}>
        Logout
      </Button>
    </form>
  );

  const blogForm = () => {
      <BlogForm createBlog={addBlog}/>
  }

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
