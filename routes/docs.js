var express = require('express');
var router = express.Router();
var rubyScraper = require('./lib/ruby-scraper.js')

router.post('/', function(req, res) {

	// Fetches user input
    var text = req.body.text

    // Checks if the search is for Ruby Docs
    if (text.match(/[a-zA-Z]+([#]|[:]{2})[a-zA-Z_]+/)) {
    	var formattedText = text.replace('?', '').split('#');
    	var rubyClass = formattedText[0];
    	var rubyMethod = formattedText[1];

        res.json(rubyScraper(rubyClass, rubyMethod))
    } else {
        res.json('YOU ARE WRONG!');
    }
});

module.exports = router;
