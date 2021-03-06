module.exports = {
    //Function that returns the capitalized form of the string
    capitalize: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    reverseString: function(str) {
        var splitString = str.split("");

        var reverseArray = splitString.reverse();

        var joinArray = reverseArray.join("");

        return joinArray;
    },

    responseFormatter: function(response) {
        response = response.replace(/"/g, "'");
        response = module.exports.reverseString(response);
        response = response.replace("\n", "");
        response = module.exports.reverseString(response);
        response = response.replace(/\n/g, "`\n`");

        return response;
    }
};
