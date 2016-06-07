var rubyScraper = function(rubyClass, rubyMethod) {
	var url = `http://ruby-doc.org/core-2.3.0/${capitalize(rubyClass)}.html;`

	request(url, function(error, response, html){
		//Make sure there isn't an error
		if (!error){
			var $ = cheerio.load(html);
			var container = ""

			$(`#${rubyMethod}-method pre .ruby`)
		}
	})
	return url
}

//-------------------------- Organizing code and stuff -----------------------------------------

//Function that returns the capitalized form of the string
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = rubyScraper