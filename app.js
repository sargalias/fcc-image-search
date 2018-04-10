"use strict";
const express = require('express');
const path = require('path');


const app = express();

// Public directory
app.use(express.static(path.join(__dirname, 'public')));


app.get('/test', (req, res) => {
    http.get('https://google.com', (res) => {
        res.send(res);
    });
});




const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Server started on port ' + port);
});