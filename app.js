const express = require('express');
const logger = require('morgan');

const app = express();
const port = process.env.PORT || 4000

app.use(logger('dev'));

// Catch 404 
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err)
})

// Error handler
app.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message
    })
})

app.listen(port, () => console.log(`Server started at ${port}`))