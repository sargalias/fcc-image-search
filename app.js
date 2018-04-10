"use strict";
const express = require('express');
const path = require('path');
const request = require('request');
const googleConfig = require('./config/google');


// Google config and setup
const GOOGLE_API_KEY = googleConfig.API_KEY;
const GOOGLE_SE_ID = googleConfig.SEARCH_ENGINE_ID;
const baseUrl = 'https://www.googleapis.com/customsearch/v1';
const keyParam = `key=${GOOGLE_API_KEY}`;
const cxParam = `cx=${GOOGLE_SE_ID}`;

const app = express();

// Public directory
app.use(express.static(path.join(__dirname, 'public')));


app.get('/test', (req, res) => {
    const q = `q=lolcats`;
    const finalUrl = `${baseUrl}?${keyParam}&${cxParam}&${q}`;
    console.log(finalUrl);
    request.get(finalUrl, (err, req, body) => {
        let reqRes = JSON.parse(body);
        res.send(reqRes);
    });
});




const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Server started on port ' + port);
});