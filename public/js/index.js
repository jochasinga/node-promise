if (window.Promise) {
  console.log('Promise found');

  var promise = new Promise(function(resolve, reject) {
		var req = new XMLHttpRequest();

		req.open('GET', 'http://localhost/api/1/foo');
		req.onload = function() {
	    if (req.status == 200) {
				// we got data here, so resolve the Promise
				resolve(req.response);
	    } else {
				reject(Error(request.statusText)); // status is not 200 OK
	    }
		};

		req.onerror = function() {
	    reject(Error('Error fetching data.'));
		};

		req.send(); // send the request
  });

  console.log('Asynchronous request made.');

  promise.then(function(data) {
		console.log('Got data! Promise fulfilled');
	}, function(error) {
		console.log('Promise not available')
	}
}
