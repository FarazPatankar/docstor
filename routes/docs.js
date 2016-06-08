var express = require('express');
var router = express.Router();
var rubyScraper = require('./lib/ruby-scraper.js')
var helper = require('./lib/helper.js')

router.post('/', function(req, res) {

	// Fetches user input from Slack
    var text = req.body.text

    // Fetches user input from Postman
    //var text = req.headers.text

    // Set response to ephemeral or in_channel based on what the user wants
    var response_type;
    if (text.includes('show')){
        response_type = "in_channel"
    } else {
        response_type = "ephemeral"
    }

    // Checks if the search is for Ruby Docs
    if (text.match(/[a-zA-Z]+([#]|[:]{2})[a-zA-Z_]+/)) {

    	var formattedText = text.replace('?', '').replace(' show', '').split('#');
    	var rubyClass = formattedText[0];
    	var rubyMethod = formattedText[1];

        // Response from the scraper function
        //console.log(rubyScraper.scraper(rubyClass, rubyMethod))

        res.json({
            "response_type": response_type,
            "text": `Link : http://ruby-doc.org/core-2.2.0/${helper.capitalize(rubyClass)}.html#method-i-${rubyMethod.toLowerCase()}`,
            "attachments": [
                {
                    "text": "Just some text to test stuff out",
                    "mrkdwn_in": ["text"]
                }
            ],
            "mrkdwn": true
        });
    } else {
        res.json({
            "response_type": "in_channel",
            "text": "You're doing it wrong, check out the documentation here - LINKGOESHERE"
        });
    }
});

module.exports = router;
