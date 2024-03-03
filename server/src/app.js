const path = require('path');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const routes = require('./routes');
const { logFile } = require('./utils');
const { missingRouteHandler, globalErrorHandler } = require('./middlewares');

const app = express();
const options = app.get('env') === 'development' ? 'dev' : 'short';

// Logging
app.use(logger(options));
app.use(logFile);

// Enable CORS
app.use(cors({ origin: '*' }));

// Parse JSON
app.use(express.json());

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Serve static files
app.use(express.static(path.join(process.cwd(), 'public')));

// Setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes handling
app.use('/api', routes);

// Missing route error 404: 'Not Found',
app.use(missingRouteHandler);

// Global error 500: 'Internal Server Error',
app.use(globalErrorHandler);

module.exports = app;
