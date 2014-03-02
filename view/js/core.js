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

		var filename = PyInterface.show_open_file_dialog("Open file");
		var content = PyInterface.read_file(filename); 
		$('#text').val(content); 
	}); 

	Events.on("keypress", function(e){
		// do keypress stuffs here
	})
});