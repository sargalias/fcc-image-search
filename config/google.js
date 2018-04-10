if (process.env.NODE_ENV === 'production') {
    module.exports = require('./google-prod');
} else {
    module.exports = require('./google-dev');
}