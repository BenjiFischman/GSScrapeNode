var http = require('http');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

const PORT = 8080;

app.post('/write-titles', function(request, response) {
	titles = request.body
	try {
		for(var index in titles){
			console.log('Writing title: ' + titles[index]);
			fs.appendFile('titles.txt', titles[index] + '\n',
			function(e) {
				if(e !== null) { console.log(e); }
			});
		}
	response.status(200).send('titles written successfully');
	} catch(e) {
		console.log(e);
		response.status(500).send('titles not written');
	}
});

app.listen(PORT, function() {
	console.log('Listening on localhost:%s', PORT);
});
