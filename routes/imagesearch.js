const router = require('express').Router();
const googleConfig = require('../config/google');
const request = require('request');
const parseGoogleResponse = require('../helpers/parseGoogleResponse');
const saveQuery = require('../helpers/saveQuery');
const showLatestQueries = require('../helpers/showLatestQueries');


// Routes
router.get('/api/imagesearch', (req, res) => {
    let url = `${googleConfig.baseUrl}?${googleConfig.keyParam}&${googleConfig.cxParam}&${googleConfig.safe}&${googleConfig.fields}`;
    if (req.query.q) {
        url += `&q=${req.query.q}`;
        if (req.query.offset) {
            url += `&start=${req.query.offset}`;
        }
        request.get(url,
            function(err, req, body) {
                if (err) {
                    return res.json(err);
                }
                let formattedBody = parseGoogleResponse(body);
                res.send(formattedBody);
                saveQuery(this.originalQuery, this.originalOffset);
            }.bind({originalQuery: req.query.q, originalOffset: req.query.offset})
        );
    } else {
        res.redirect('/error');
    }
});


router.get('/api/imagesearch/latest', showLatestQueries);


// 404 error redirects to home
router.all('/', (req, res) => {
    res.redirect('/');
});


module.exports = router;
