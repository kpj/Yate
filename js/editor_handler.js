var editor = undefined;


function initEditor() {
	ace.require("ace/ext/language_tools");

	editor = ace.edit("editor");

	editor.setTheme("ace/theme/monokai");
	editor.setFontSize(12);

	editor.setOptions({
		enableBasicAutocompletion: true,
		enableSnippets: true
	});
}