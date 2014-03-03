var editor = undefined;


function OpenFileHandler() {
	var me = this;

	this.activeFile = undefined;
	this.openFiles = {};

	this.OpenFile = function (content) {
		var me = this;

		this.content = content;

		this.setContent = function(content) {
			this.content = content;
		}

		this.getContent = function() {
			return this.content;
		}
	}

	this.addFile = function(name, content) {
		me.openFiles[name] = new me.OpenFile(content);
	}

	this.closeFile = function(name) {
		delete me.openFiles[name];

		if(me.activeFile == name) {
			me.activeFile = undefined;
		}
	}

	this.setFileContent = function(name, content) {
		me.openFiles[name].setContent(content);
	}

	this.getFileContent = function(name) {
		return me.openFiles[name].getContent();
	}

	this.placeInEditor = function(name) {
		// enable syntax highlighting
		var modelist = ace.require('ace/ext/modelist');
		var mode = modelist.getModeForPath(name).mode;
		editor.getSession().setMode(mode);

		// set content
		editor.setValue(me.getFileContent(name));

		// this file is now active
		me.activeFile = name;
	}

	this.getActiveFileName = function() {
		return me.activeFile;
	}
}

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
	var openFileHandler = new OpenFileHandler();

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

		// add to filehandler
		openFileHandler.addFile(filename, content);
		openFileHandler.placeInEditor(filename);
	});
	Events.on("saveFile", function(e) {
		var fname = openFileHandler.getActiveFileName();
		var content = editor.getValue();

		PyInterface.log('Saving file to ' + fname);

		// update filehandler
		openFileHandler.setFileContent(fname, content);

		// save to disk
		PyInterface.save_file(fname, content);
	});

	// enable editor
	editor = ace.edit("editor");
	editor.setTheme("ace/theme/monokai");
});