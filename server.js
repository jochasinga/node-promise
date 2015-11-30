var express = require('express')
 ,  app = express()
 ,  path = require('path')
 ,  request = require('request');

 app.use(express.static(__dirname + '/public'));
 app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

var users = {
	get: function(result) {
		return new Promise(function(resolve, reject) {
			request("http://api.randomuser.me/?format=json&results="+result, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					resolve(response);
				} else {
					reject(error.message);
				}
			});
		});
	}
}

function handleFulfilled(data, delay) {
	console.log('got data from external API! Promise fulfilled.');

	setTimeout(function() {
		res.json(data);
	}, delay);
}

function handleRejected(error) {
	console.log('Promise rejected.');
	console.log(error.message);
	res.json(error);
}

app.get('/users', function(req, res) {
	if (Promise) {
		console.log('Promise found');

		// Async code here
		var promise1 = users.get(2)
		  , promise2 = users.get(3)
			, promise3 = users.get(1);

		promise1.then( handleFulfilled(data, 3000), handleRejected(error) );
		promise2.then( handleFulfilled(data, 1000), handleRejected(error) );
		promise3.then( handleFulfilled(data, 500), handleRejected(error) );

});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
