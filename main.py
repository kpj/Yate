import sys
from PyQt4 import QtGui, QtCore

import python.gui, python.js_interface


def main():
	app = QtGui.QApplication(sys.argv)

	# create main window
	view = python.gui.Viewer()

	# TODO: remove this line
	jsi = python.js_interface.JavascriptInterface()
	view.page().mainFrame().addToJavaScriptWindowObject("PyInterface",jsi)

	main_window = python.gui.MainWindow(view)

	sys.exit(app.exec_())

if __name__ == '__main__':
	main()