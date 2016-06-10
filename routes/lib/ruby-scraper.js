var helper = require('./helper.js');
var request = require('request');
var cheerio = require('cheerio');


module.exports = {
    scraper: function(rubyClass, rubyMethod, callback) {
        var url = `http://ruby-doc.org/core-2.3.0/${helper.capitalize(rubyClass)}.html`;
        var examples;

        request(url, function(error, response, html) {
            //Make sure there isn't an error
            if (!error) {
                var $ = cheerio.load(html);
                examples = $(`#${rubyMethod}-method`).find('pre').filter('.ruby').text();
            }
            callback(examples);
        });


    }
};