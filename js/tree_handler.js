function setupDirTree(dirname) {
	$('#dir_tree').empty()
		$('#dir_tree').jstree({
			'core': {
				'data': dictToDirTree(dirname)
			},
			'plugins': [
				'sort'
			]
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
}