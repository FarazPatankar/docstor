var express = require('express');
var router = express.Router();
var rubyScraper = require('./lib/ruby-scraper.js');
var helper = require('./lib/helper.js');
var request = require('request');

router.post('/', function(req, res) {

    // Fetches user input from Slack
    var text = req.body.text;
    var responseUrl = req.body.response_url;

    // Fetches user input from Postman
    //var text = req.headers.text;

    // Set response to ephemeral or in_channel based on what the user wants
    var responseType;
    if (text.includes('show')) {
        responseType = "in_channel";
    } else {
        responseType = "ephemeral";
    }

    // Checks if the search is for Ruby Docs
    if (text.match(/[a-zA-Z]+([#]|[:]{2})[a-zA-Z_]+!?/)) {

        var formattedText = text.replace('?', '').replace('!', '-21').replace(' show', '').split('#');
        var rubyClass = formattedText[0];
        var rubyMethod = formattedText[1].toLowerCase();

        // Response from callback is too late so we have to send a response in advance
        res.json({
            "response_type": "ephemeral",
            "text": "Wait for it..."
        });
        //
        rubyScraper.scraper(rubyClass, rubyMethod, function(response, method, methodSignature) {

            if (methodSignature !== "") {
                var responseVariable = text.replace(' show', '').split('#');

                // Format response such that it appears as a code snippet on slack
                response = helper.responseFormatter(response);

                // Sending delayed response
                request({
                        url: responseUrl, //URL to hit
                        method: 'POST',
                        json: {
                            response_type: responseType,
                            text: `Class : \`${helper.capitalize(responseVariable[0])}\`, Method : \`${responseVariable[1]}\`\nMethod Signature : ${methodSignature}\nLink : http://ruby-doc.org/core-2.2.0/${helper.capitalize(rubyClass)}.html#method-i-${method}`,
                            attachments: [{
                                text: "`" + response + "`", // response has to be between backticks to appear as a code block
                                mrkdwn_in: ["text"]
                            }],
                            mrkdwn: true
                        }
                    },
                    function(error, response, body) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(response.statusCode, body);
                        }
                    });
            } else {
                request({
                        url: responseUrl, //URL to hit
                        method: 'POST',
                        json: {
                            response_type: responseType,
                            text: `Error : That method does not exist, you may want to check out the actual docs.\nLink : http://ruby-doc.org/core-2.2.0/${helper.capitalize(rubyClass)}.html`,
                            mrkdwn: true
                        }
                    },
                    function(error, response, body) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(response.statusCode, body);
                        }
                    });
            }
        });

    } else {
        res.json({
            "response_type": responseType,
            "text": "You're doing it wrong, check out the documentation here - http://docstor.herokuapp.com/"
        });
    }
});

module.exports = router;
