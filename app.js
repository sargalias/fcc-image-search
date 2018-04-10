"use strict";
const express = require('express');
const path = require('path');
const request = require('request');
const googleConfig = require('./config/google');


// Express setup
const app = express();

// Public directory
app.use(express.static(path.join(__dirname, 'public')));



// Routes
app.get('/api/imagesearch', (req, res) => {
    let url = `${googleConfig.baseUrl}?${googleConfig.keyParam}&${googleConfig.cxParam}&${googleConfig.safe}&${googleConfig.fields}`;
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