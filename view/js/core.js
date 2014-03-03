var editor = undefined;
var openedFileName = undefined; // make this a list of objects

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

	// handle events
	Events.on("keypress", function(e) {
		keyHandler.checkKey('press', e);
	});
	Events.on("keyrelease", function(e) {
		keyHandler.checkKey('release', e);
	});
	Events.on("openFile", function(e) {
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

		openedFileName = filename;
	});
	Events.on("saveFile", function(e) {
		PyInterface.log('Saving file to ' + openedFileName);

		PyInterface.save_file(openedFileName, editor.getValue());
	});

	// enable editor
	editor = ace.edit("editor");
	editor.setTheme("ace/theme/monokai");
});