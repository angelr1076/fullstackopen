import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
// import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const App = () => {
  // All blogs display
  const [blogs, setBlogs] = useState([]);
  const [loginVisible, setLoginVisible] = useState(false);
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

  const addBlog = async blogObject => {
    const newBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(newBlog));
    console.log(newBlog);
    setMessage(`New blog added "${newBlog.title}! by ${newBlog.author}"`);
    setMessageClass('success');
    setTimeout(() => {
      setMessage(null);
      setMessageClass('none');
    }, 3000);
  };

  const updateBlog = async blogObject => {
    const blogToUpdate = await blogService.update(blogObject.id, blogObject);
    setBlogs(
      blogs.map(blog => (blog.id !== blogToUpdate.id ? blog : blogToUpdate)),
    );
    console.log(blogToUpdate);
    setMessage(`Liked "${blogToUpdate.title}"`);
    setMessageClass('success');
    setTimeout(() => {
      setMessage(null);
      setMessageClass('none');
    }, 3000);
  };

  const deleteBlog = async id => {
    const blogToDelete = await blogService.remove(id);
    setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id));
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
    const hideWhenVisible = { display: loginVisible ? 'none' : '' };
    const showWhenVisible = { display: loginVisible ? '' : 'none' };

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
    );
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

  const logOutForm = () => (
    <form onSubmit={handleLogOut}>
      <Button variant='info' type='submit' style={{ color: 'white' }}>
        Logout
      </Button>
    </form>
  );

  const blogForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' };
    const showWhenVisible = { display: loginVisible ? '' : 'none' };

    return (
      <div>
        <div style={hideWhenVisible}>
          <Button variant='success' onClick={() => setLoginVisible(true)}>
            Add blog
          </Button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm createBlog={addBlog} />
          <Button variant='secondary' onClick={() => setLoginVisible(false)}>
            cancel
          </Button>
        </div>
      </div>
    );
  };

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
          {blogs
            .sort((a, b) => (a.likes > b.likes ? -1 : 1))
            .map(blog => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
              />
            ))}
        </ul>
      </Container>
    </div>
  );
};

export default App;
