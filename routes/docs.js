var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
	console.log(req);
  	res.json('HI');
});

module.exports = router;