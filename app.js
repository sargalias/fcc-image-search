"use strict";
const express = require('express');
const path = require('path');
const routes = require('./routes/imagesearch');
const mongoose = require('mongoose');
const {DATABASE_URI} = require('./config/database');


// Mongoose connection
mongoose.connect(DATABASE_URI);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


// Express setup
const app = express();

// Public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(routes);



const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Server started on port ' + port);
});