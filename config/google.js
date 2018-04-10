const {GOOGLE_API_KEY, GOOGLE_SE_ID} = (process.env.NODE_ENV === 'production') ?
    require('./google-prod') : require('./google-dev');

const baseUrl = 'https://www.googleapis.com/customsearch/v1';
const keyParam = `key=${GOOGLE_API_KEY}`;
const cxParam = `cx=${GOOGLE_SE_ID}`;
const safe = 'safe=medium';
const fields = 'fields=items(title, snippet, link, pagemap)';

module.exports = {
    GOOGLE_API_KEY,
    GOOGLE_SE_ID,
    baseUrl,
    keyParam,
    cxParam,
    safe,
    fields
};
