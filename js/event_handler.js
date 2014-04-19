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
		loadFile(filename);
	});

	Events.on("saveFile", function(e) {
		saveFile();
	});

	Events.on("openDirectory", function() {
		PyInterface.log('Opening directory');

		// get name of wanted directory
		var dirname = PyInterface.show_open_directory_dialog("Open directory");
		if(dirname.length == 0) {
			PyInterface.log("No directory selected");
			return;
		}

		// setup dir view
		$('#dir_tree').empty()
		$('#dir_tree').jstree({
			'core': {
				'data': dictToDirTree(dirname)
			}
		});

		$('#dir_tree').on("changed.jstree", function (e, data) {
			// get node name
			var node = '/' + data.node.text;

			// get its sub-directory
			var subdir = '';
			for(var i = data.node.parents.length-1 ; i >= 0 ; i--) {
				var id = data.node.parents[i];

				if(id != '#') {
					subdir += '/' + $('#dir_tree').jstree().get_node(id).text;
				}
			}

			var filename = dirname + subdir + node;

			if(data.node.data.type == 'file')
				loadFile(filename);
		});
	});

	Events.on("focusout", function() {
		//saveFile();
	});

	Events.on('exitApplication', function(e) {
		PyInterface.shutdown();
	});
}