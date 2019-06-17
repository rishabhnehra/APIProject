const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/users')

const app = express();
const port = process.env.PORT || 4000;

mongoose.connect(`mongodb://localhost:27017/apiproject'`, { useNewUrlParser: true })
app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/users', users);

// Catch 404 
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err)
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({
        message: err.message
    })
});

app.listen(port, () => console.log(`Server started at ${port}`));