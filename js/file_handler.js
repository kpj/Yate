var openFileHandler = undefined;


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

		// unmark other files
		$('#multifile_panel').find('span').each(function(i, val) {
			$(val).removeClass('open');
		})

		// add file to multifile panel
		$('#multifile_panel').append(
			$('<span>' + getFilename(name) + '</span>')
			.data('filename', name)
			.click(function() {
				me.placeInEditor($(this).data('filename'));

				$('#multifile_panel').find('span').each(function(i, val) {
					$(val).removeClass('open');
				})

				$(this).addClass('open', true);
			})
			.addClass('open')
		);
	}

	this.closeFile = function(name) {
		// remove from multifile panel
		$('#multifile_panel').find('span').each(function(i, val) {
			if($(val).data('filename') == name) {
				$(val).remove();
			}
		})

		// update internal variables
		delete me.openFiles[name];

		if(me.activeFile == name) {
			me.activeFile = undefined;
		}

		// clear editor
		editor.setValue('');
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