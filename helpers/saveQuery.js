const QueryModel = require('../models/query');


function saveQuery(query, offset) {
    let document = {};
    if (query) {
        document.query = query
    } else {
        document.query = "";
    }
    if (offset) {
        document.offset = offset
    }
    QueryModel.create(document, (err) => {
        if (err) console.log(err);
    });
}

module.exports = saveQuery;