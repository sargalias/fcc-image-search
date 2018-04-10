const QueryModel = require('../models/query');

function deleteExtraQueries() {
    QueryModel
        .find()
        .sort({when: 1})
        .exec((err, data) => {
            if (err) {
                return console.log(err);
            }
            if (data.length > 10) {
                for (let i=0; i<data.length-10; i++) {
                    QueryModel.deleteOne({_id: data[i]._id}, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            }
        });
}

module.exports = deleteExtraQueries;