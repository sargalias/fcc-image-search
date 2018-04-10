const router = require('express').Router();
const showLatestQueries = require('../helpers/showLatestQueries');
const googleQuery = require('../helpers/googleQuery');


// Routes
router.get('/api/imagesearch', googleQuery);

router.get('/api/imagesearch/latest', showLatestQueries);


// 404 error redirects to home
router.all('/', (req, res) => {
    res.redirect('/');
});


module.exports = router;
