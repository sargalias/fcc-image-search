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

module.exports = parseGoogleResponse;
