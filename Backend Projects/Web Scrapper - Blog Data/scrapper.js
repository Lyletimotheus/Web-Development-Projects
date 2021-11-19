const request = require('request');
const cheerio = require('cheerio');
const { load } = require('cheerio');
const fs = require('fs');

const writeStream = fs.createWriteStream('data.csv');

// Write Headers
writeStream.write(`Item, Link`);

// Make a request
request('https://www.ciphercode.co.za/views/blog/javascript-es6.php', (error, response, html) => {
// Check if there is an error of if the status code is not 200
    if(!error && response.statusCode == 200) {
        const $ = load(html);
// Get the sites heading
const siteHeading = $('.fade-in');

// To get the entire html 
// console.log(siteHeading.html());

// To get the text
// console.log(siteHeading.text());

// To search for a element's text
const output = siteHeading.find('h1').text();
// console.log(output);

// To search for a elements children
// const output = siteHeading.children('h1').text();
// console.log(output);

// To return the next element of a child
// const output = siteHeading
// .children('h1')
// .next()
// .text();
// console.log(output);

// The parent
// const output = siteHeading
// .children('h1')
// .parent()
// .text();
// console.log(output);

// Looping over items (Nav Items)
$('li .ft-12').each((i, el) => {
    const item = $(el).text();
    const link = $(el).attr('href');
    // console.log(link);
    // Write to CSV File
    writeStream.write(`${item},${link} \n`);

});

// console.log(output);

// Scrapping done
console.log('Scrapping done...');
    }
});