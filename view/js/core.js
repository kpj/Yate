var editor = undefined;

function KeyHandler() {
	var me = this;

	this.shift = false;
	this.ctrl = false;
	this.alt = false;

	this.checkKey = function(type, keyId) {
		switch(parseInt(keyId, 10)) {
			case 16777248:
				me.shift = (type == 'press') ? true : false;
				break;
			case 16777249:
				me.ctrl = (type == 'press') ? true : false;
				break;
			case 16777250:
				// shift + alt ?!
				me.alt = (type == 'press') ? true : false;
				break;
			case 16777251:
				me.alt = (type == 'press') ? true : false;
				break;
			default:
				if(type == 'press') {
					me.checkShortcut(keyId, me.shift, me.ctrl, me.alt);
				}
		}
	}

	this.checkShortcut = function(keyId, shift, ctrl, alt) {
		console.log(keyId, shift, ctrl, alt);
	}
}

$(document).ready(function() {
	/*
	* Setup view
	*/

	var keyHandler = new KeyHandler();

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
		keyHandler.checkKey('press', e);
	});
	Events.on("keyrelease", function(e) {
		keyHandler.checkKey('release', e);
	});

	// enable editor
	editor = ace.edit("editor");
	editor.setTheme("ace/theme/monokai");
});