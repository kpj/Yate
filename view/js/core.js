var editor = undefined;

$(document).ready(function() {
	/*
	* Setup view
	*/

	// init buttons
	$('#save')
	.click(function() {
		var fname = $('#filename').val();

		PyInterface.log('Saving file to ' + fname);

		PyInterface.save_file(fname, editor.getValue());
	})
	$('#open')
	.click(function() {
		PyInterface.log('Opening file');

		// load file
		var filename = PyInterface.show_open_file_dialog("Open file");
		var content = PyInterface.read_file(filename);

		// enable syntax highlighting
		var modelist = ace.require('ace/ext/modelist');
		var mode = modelist.getModeForPath(filename).mode;
		editor.getSession().setMode(mode);

		// set content
		editor.setValue(content);

		$('#filename').val(filename);
	}); 

	// handle events
	Events.on("keypress", function(e) {
		// do keypress stuffs here
	});

	// enable editor
	editor = ace.edit("editor");
	editor.setTheme("ace/theme/monokai");
});