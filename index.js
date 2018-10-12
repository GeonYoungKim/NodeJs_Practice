const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const user = require('./api/user');

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', user);

module.exports = app;