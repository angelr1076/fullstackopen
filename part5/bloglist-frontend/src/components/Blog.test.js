import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

test('renders blog', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Angel Rodriguez',
  };

  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library',
  );
});

test('clicking the button twice calls event handler twice', () => {
  const blog = {
    title: 'This is a journey through time',
    author: 'Angel Rodriguez',
    url: 'http://www.angelrod.dev',
    likes: 3,
  };

  const mockHandler = jest.fn();

  const component = render(<Blog blog={blog} onClick={mockHandler} />);

  const button = component.getByText('Likes');
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

test('clicking the button returns url', () => {
  const blog = {
    title: 'This is a journey through time',
    author: 'Angel Rodriguez',
    url: 'http://www.angelrod.dev',
    likes: 3,
  };

  const mockHandler = jest.fn(test => test.likes);

  const component = render(<Blog blog={blog} toggleVisibility={mockHandler} />);

  const button = component.getByText('View');
  fireEvent.click(button);

  const url = component.container.querySelector('.urlItem');

  expect(url).toHaveTextContent('http://www.angelrod.dev');
});

test('clicking the button returns number of likes', () => {
  const blog = {
    title: 'This is a journey through time',
    author: 'Angel Rodriguez',
    url: 'http://www.angelrod.dev',
    likes: 3,
  };

  const mockHandler = jest.fn(test => test.likes);

  const component = render(<Blog blog={blog} toggleVisibility={mockHandler} />);

  const button = component.getByText('View');
  fireEvent.click(button);

  const likes = component.container.querySelector('.likesItem');

  expect(likes).toHaveTextContent(3);
});
