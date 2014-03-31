function getFilename(path) {
	var parts = path.split('/');
	return parts[parts.length - 1];
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