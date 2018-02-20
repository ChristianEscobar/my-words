const request = require("request-promise");

module.exports = (app) => {
	app.post("/api/lookup", (req, res) => {
		const options = {
    	uri: "https://od-api.oxforddictionaries.com:443/api/v1/entries/en/" 
            + req.body.word + "/definitions;pronunciations",
    	headers: {
          "Accept": "application/json",
  				"app_id": "8d60399d",
  				"app_key": "c2bcd725c2470aa1bce8943991dc79b0"
    	},
    	json: true // Automatically parses the JSON string in the response
		};

	 	request(options)
	 	.then((def) => {
   		res.json(def);
		}).catch((err) => {
   		console.error(err);
		});
	});
}