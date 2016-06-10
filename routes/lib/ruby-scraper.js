var helper = require('./helper.js');
var request = require('request');
var cheerio = require('cheerio');


module.exports = {
    scraper: function(rubyClass, rubyMethod, callback) {
        var url = `http://ruby-doc.org/core-2.3.0/${helper.capitalize(rubyClass)}.html`;

        request(url, function(error, response, html) {
            //Make sure there isn't an error
            if (!error) {
                var $ = cheerio.load(html);

                var examples = $(`#${rubyMethod}-method`).find('pre').filter('.ruby').text();
                    console.log("before", examples)

                if (examples === "") {
                    examples = $(`div[id*=${rubyMethod}]`).find('pre').filter('.ruby').text();

                    if (examples !== "") {
                        console.log("after", examples)
                        var method = rubyMethod + "-3F"
                        callback(examples, method);
                    } else {
                        examples = "Sorry, unfortunately this method has no examples :("
                        callback(examples, rubyMethod)
                    }
                } else {
                    callback(examples, rubyMethod)
                }
            }
        });


    }
};
