import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import TestBlog from './TestBlog';
import TestForm from './TestForm';

describe('test <TestBlog /> for properties', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Angel Rodriguez',
    url: 'http://www.angelrod.dev',
    likes: 3,
  };

  const mockHandler = jest.fn();

  test('renders blog title and author', () => {
    const component = render(<TestBlog blog={blog} />);

    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library',
      'Angel Rodriguez',
    );
  });

  test('clicking the button returns url', () => {
    const blog = {
      title: 'This is a journey through time',
      author: 'Angel Rodriguez',
      url: 'http://www.angelrod.dev',
      likes: 3,
    };

    const component = render(<TestBlog blog={blog} onClick={mockHandler} />);

    const button = component.getByText('Show');
    fireEvent.click(button);

    const url = component.container.querySelector('.url');

    expect(url).toHaveTextContent('http://www.angelrod.dev');
  });

  test('clicking the button returns number of likes', () => {
    const blog = {
      title: 'This is a journey through time',
      author: 'Angel Rodriguez',
      url: 'http://www.angelrod.dev',
      likes: 3,
    };

    const mockHandlerLikes = jest.fn(test => test.likes);

    const component = render(
      <TestBlog blog={blog} onClick={mockHandlerLikes} />,
    );

    const button = component.getByText('Like');
    fireEvent.click(button);

    const likes = component.container.querySelector('.likes');

    expect(likes).toHaveTextContent(3);
  });

  test('clicking the button twice calls event handler twice', () => {
    const blog = {
      title: 'This is a journey through time',
      author: 'Angel Rodriguez',
      url: 'http://www.angelrod.dev',
      likes: 3,
    };

    const component = render(<TestBlog blog={blog} onClick={mockHandler} />);

    const button = component.getByText('Like');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});

describe('test <TestForm /> fireEvent', () => {
  test('form calls the event handler it received as props', () => {
    const createBlog = jest.fn();

    const component = render(<TestForm createBlog={createBlog} />);

    const author = component.container.querySelector('#author');
    const form = component.container.querySelector('form');

    fireEvent.change(author, {
      target: { value: 'Eggie' },
    });
    fireEvent.submit(form);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].author).toBe('Eggie');
  });
});
