const request = require('request');
const cheerio = require('cheerio');
const { load } = require('cheerio');

// Make a request
request('https://www.ciphercode.co.za/views/blog/javascript-es6.php', (error, response, html) => {
// Check if there is an error of if the status code is not 200
    if(!error && response.statusCode == 200) {
        const $ = load(html);
// Find all the sub-headings in the article
        $('.mb-1').each((i, el) => {
            const subHeading = $(el)
            .find('h2')
            .text()
            .replace(/\s\s+/g, '');
// Find the date of the article
            const date = $(el)
            .find()
            .text();

            console.log(subHeading, date);
        })
    }
});