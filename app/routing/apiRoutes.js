const request = require("request-promise");

module.exports = (app) => {
	app.post("/api/lookup", (req, res) => {
		const options = {
    	uri: "https://od-api.oxforddictionaries.com:443/api/v1/entries/en/" + req.body.word,
    	headers: {
          "Accept": "application/json",
  				"app_id": "8d60399d",
  				"app_key": "c2bcd725c2470aa1bce8943991dc79b0"
    	},
    	json: true // Automatically parses the JSON string in the response
		};

	 	request(options)
	 	.then((def) => {
   		console.log("def =>", def);

   		res.json(def.results[0].lexicalEntries[0]);
		}).catch((err) => {
   		console.error(err);
		});


 			/*
  	$.ajax({
    	url: apiURL,
    	method: 'GET'
  	}).done(function(response){
    	console.log(response);

    	res.json(true);
  	});
  	*/
	});
}