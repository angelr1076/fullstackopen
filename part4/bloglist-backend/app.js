const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('./utils/logger');
const loginRouter = require('./controllers/login');
const userRouter = require('./controllers/users');
const blogRouter = require('./controllers/blogs');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');

logger.info('connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(middleware.tokenExtractor);

app.use(express.static('build'));
app.use(express.json());

app.use(middleware.requestLogger);

app.use('/api/login', loginRouter);
app.use('/api/users', userRouter);
app.use('/api/blogs', blogRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
