function initWindow() {
	PyInterface.execute('window', 'setWindowTitle', ['Yate']);

	struct = [
		{
			"name": "File",
			"items": [
				{
					"name": "&Open File",
					"shortcut": "Ctrl+O",
					"statustip": "Open new file",
					"trigger": "openFile"
				},
				{
					"name": "&Open Directory",
					"shortcut": "bla",
					"statustip": "Open new directory in tree view",
					"trigger": "openDirectory"
				},
				{
					"name": "&Save",
					"shortcut": "Ctrl+S",
					"statustip": "Save current file",
					"trigger": "saveFile"
				},
				{
					"name": "&Exit",
					"shortcut": "Ctrl+Q",
					"statustip": "Exit application",
					"trigger": "exitApplication"
				}
			]
		}
	];
	PyInterface.create_menu(JSON.stringify(struct));

	PyInterface.execute('window', 'show', []);
}