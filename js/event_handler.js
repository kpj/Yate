function initEvents() {
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
		if(filename.length == 0) {
			PyInterface.log("No file selected");
			return;
		}
		var content = PyInterface.read_file(filename);

		// add to filehandler
		openFileHandler.addFile(filename, content);
		openFileHandler.placeInEditor(filename);
	});

	Events.on("saveFile", function(e) {
		saveFile();
	});

	Events.on("openDirectory", function() {
		PyInterface.log('Opening directory');

		var dirname = PyInterface.show_open_directory_dialog("Open directory");
		if(dirname.length == 0) {
			PyInterface.log("No directory selected");
			return;
		}
		var content = JSON.parse(PyInterface.get_directory_content(dirname));

		PyInterface.log(content);
	});

	Events.on("focusout", function() {
		//saveFile();
	});

	Events.on('exitApplication', function(e) {
		PyInterface.shutdown();
	});
}