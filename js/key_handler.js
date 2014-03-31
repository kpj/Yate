var keyHandler = undefined;


function KeyHandler() {
	var me = this;

	this.shift = false;
	this.ctrl = false;
	this.alt = false;

	this.checkKey = function(type, keyId) {
		switch(parseInt(keyId, 10)) {
			case 16777248:
				me.shift = (type == 'press') ? true : false;
				break;
			case 16777249:
				me.ctrl = (type == 'press') ? true : false;
				break;
			case 16777250:
				// shift + alt ?!
				me.alt = (type == 'press') ? true : false;
				break;
			case 16777251:
				me.alt = (type == 'press') ? true : false;
				break;
			default:
				if(type == 'press') {
					me.checkShortcut(keyId, me.shift, me.ctrl, me.alt);
				}
		}
	}

	this.checkShortcut = function(key, shift, ctrl, alt) {
		//PyInterface.log(keyId + ' ' + shift + ' ' + ctrl + ' ' + alt);

		if(key == 87 && ctrl) {
			// [ctrl] + [w] -> close current file
			openFileHandler.closeFile(openFileHandler.getActiveFileName());
		} else if(key == 43 && ctrl) {
			// [ctrl] + [+] -> increase font size
			if(editor.getFontSize() < 80)
				editor.setFontSize(editor.getFontSize() + 2);
		} else if(key == 45 && ctrl) {
			// [ctrl] + [-] -> decrease font size
			if(editor.getFontSize() > 5)
				editor.setFontSize(editor.getFontSize() - 2);
		}
	}
}