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
const safe = 'safe=medium';
const fields = 'fields=items(title, snippet, link, pagemap)';


// Express setup
const app = express();
// Public directory
app.use(express.static(path.join(__dirname, 'public')));



// Routes
app.get('/api/imagesearch', (req, res) => {
    let url = `${baseUrl}?${keyParam}&${cxParam}&${safe}&${fields}`;
    if (req.query.q) {
        url += `&q=${req.query.q}`;
    }
    if (req.query.offset) {
        url += `&start=${req.query.offset}`;
    }
    request.get(url, (err, req, body) => {
        if (err) {
            return res.json(err);
        }
        let formattedBody = parseGoogleResponse(body);
        res.send(formattedBody);
    });
});



// Helpers
function parseGoogleResponse(body) {
    let json = JSON.parse(body);
    let formatted = [];
    json.items.forEach((el) => {
        let item = {
            title: el.title,
            description: el.snippet,
            link: el.link,
        };
        if (el.pagemap.cse_thumbnail) {
            item.thumbnail = el.pagemap.cse_thumbnail[0].src;
        }
        if (el.pagemap.cse_image) {
            item.image = el.pagemap.cse_image[0].src;
        }
        formatted.push(item);
    });
    return formatted;
}




const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Server started on port ' + port);
});