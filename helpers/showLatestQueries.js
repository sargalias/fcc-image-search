const mongoose = require('mongoose');
const QueryModel = require('../models/query');


function showLatestQueries(req, res) {
    QueryModel
        .find({}, {_id: 0, __v: 0})
        .limit(10)
        .sort({when: -1})
        .exec((err, data) => {
            if (err) {
                res.send(err);
                return;
            }
            res.json(data);
        });
}


module.exports = showLatestQueries;