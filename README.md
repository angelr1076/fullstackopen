# Full Stack Open

## Sections

- [x] Part 0
      Fundamentals of Web apps
      Introduction to React

- [x] Part 1
      Introduction to React
      Communicating with server

- [x] Part 2
      Communicating with server

- [x] Part 3
      Programming a server with NodeJS and Express
      Testing Express servers, user administration

- [x] Part 4
      Testing Express servers, user administration
      Testing React apps

- [x] Part 5
      Testing React apps

- [x] Part 6
      State management with Redux
      React router, custom hooks, styling app with CSS and webpack


Testing: 

The following command only runs the tests found in the tests/note_api.test.js file:

    npm test -- tests/note_api.test.js

The -t option can be used for running tests with a specific name:

    npm test -- -t "a specific note is within the returned notes"

The provided parameter can refer to the name of the test or the describe block. The parameter can also contain just a part of the name. The following command will run all of the tests that contain notes in their name:

    npm test -- -t 'notes'
