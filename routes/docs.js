var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
	// console.log(req.body.text);

	var text = req.body.text

	if (text.match(/[a-zA-Z]+([#]|[:]{2})[a-zA-Z_]+/)){
		res.json('Good job, kid!')
	} else {
	  	res.json('YOU ARE WRONG!');
	}
});

module.exports = router;