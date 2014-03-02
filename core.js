function handle_key(key) {
	/*
	* Handles incoming keys
	*/
	PyInterface.log('Got key: ' + key)
}

$(document).ready(function() {
	/*
	* Setup view
	*/

	// init buttons
	$('#save')
	.click(function() {
		var fname = $('#filename').val();

		PyInterface.log('Saving file to ' + fname);

		PyInterface.save_file(fname, $('#text').val());
	})
	$('#open')
	.click(function() {
		PyInterface.log('Opening file');

		var content = PyInterface.open_file();
	})
});