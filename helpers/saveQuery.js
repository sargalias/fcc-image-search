const QueryModel = require('../models/query');
const deleteExtraQueries = require('./deleteExtraQueries');


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
        if (err) {
            console.log(err);
        }
        else {
            deleteExtraQueries();
        }
    });
}


module.exports = saveQuery;