if (process.env.NODE_ENV === 'production') {
    module.exports = require('./database-prod.js');
} else {
    module.exports = require('./database-dev.js');
}
