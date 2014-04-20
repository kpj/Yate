function getFilename(path) {
	var parts = path.split('/');
	return parts[parts.length - 1];
}

function loadFile(filename) {
	var content = PyInterface.read_file(filename);

	// add to filehandler
	openFileHandler.addFile(filename, content);
	openFileHandler.placeInEditor(filename);
}

function saveFile(fname, content) {
	var fname = openFileHandler.getActiveFileName();
	var content = editor.getValue();

	if(typeof fname === "undefined") {
		PyInterface.log("No file opened");
		return;
	}

	PyInterface.log('Saving file to ' + fname);

	// update filehandler
	openFileHandler.setFileContent(fname, content);

	// save to disk
	PyInterface.save_file(fname, content);
}

function dictToDirTree(dirname) {
	var content = JSON.parse(PyInterface.get_directory_content(dirname));
	var data = [];

	for(var key in content) {
		var type = content[key]['type'];
		if(type == 'file') {
			data.push({
				'text': key,
				'icon': false,
				'data': {
					'type': type
				}
			});
		} else {
			data.push({
				'text': key,
				'icon': false,
				'children': ['dummy'],
				'data': {
					'type': type,
					'loaded': false,
					'toload': dirname + '/' + key
				}
			});
		}
	}

	return data;
}