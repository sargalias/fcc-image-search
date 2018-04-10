"use strict";
const express = require('express');
const path = require('path');
const routes = require('./routes/imagesearch');


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