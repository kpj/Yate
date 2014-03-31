function init() {
	/*
	 * Setup objects
	 */
	keyHandler = new KeyHandler();
	openFileHandler = new OpenFileHandler();
	
	/*
	 * Handle events
	 */
	initEvents();


	/*
	 * Enable editor
	 */
	initEditor();


	/*
	 * Setup window/webview
	 */
	initWindow();
}