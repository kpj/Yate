function setupDirTree(dirname) {
	$('#dir_tree').empty()
		$('#dir_tree').jstree({
			'core': {
				'data': dictToDirTree(dirname),
				'check_callback' : true,
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

			if(data.node.data.type == 'file') {
				loadFile(filename);
			}
		});

		$('#dir_tree').on("open_node.jstree", function (e, data) {
			if(!data.node.data.loaded) {
				var content = dictToDirTree(data.node.data.toload);

				// remove dummy node
				$('#dir_tree').jstree().delete_node(data.node.children[0]);

				// add new nodes
				for(var p in content) {
					$('#dir_tree').jstree().create_node(
						data.node.id, // parent
						content[p]
					);
				}

				data.node.data.loaded = true;
			}
		});
}