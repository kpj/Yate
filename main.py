import sys
import json
from PyQt4 import QtCore, QtGui, QtWebKit


class JavascriptInterface(QtCore.QObject):
	"""Provides e.g. fs-access in javascript itself
	"""
	@QtCore.pyqtSlot(str)
	def log(self, msg):
		"""Easy logging for javascript (prints to normal terminal)
		"""
		print(msg)

	@QtCore.pyqtSlot(str, result=str)
	def read_file(self, fname):
		"""Reads file content
		"""

		return open(fname, 'r').read()

	@QtCore.pyqtSlot(str, result=str)
	def show_open_file_dialog(self, title):
		"""Asks for file and returns file name
		"""
		fname = QtGui.QFileDialog.getOpenFileName(None, title, '.')
		return fname

	@QtCore.pyqtSlot(str, str)
	def save_file(self, fname, content):
		"""Saves given content to specified file
		"""
		with open(fname, 'w') as fd:
			fd.write(content)

class Viewer(QtWebKit.QWebView):
	def __init__(self):
		QtWebKit.QWebView.__init__(self)

		# more to come
	def evtHandler(self, key, args):
		args = json.dumps(args)
		key = json.dumps(key)

		print "Events.__pyTrigger("+key+", "+args+")"
		self.page().mainFrame().evaluateJavaScript(
			"Events.__pyTrigger("+key+", "+args+")"
		)

	def keyPressEvent(self, e):
		self.evtHandler("keypress", [str(e.key())])

		QtWebKit.QWebView.keyPressEvent(self, e)

def main():
	app = QtGui.QApplication(sys.argv)

	# create javascript interface
	js_interface = JavascriptInterface()

	# create main window
	view = Viewer()
	view.page().mainFrame().addToJavaScriptWindowObject("PyInterface", js_interface)
	view.load(QtCore.QUrl('./view/index.html'))
	view.show()

	sys.exit(app.exec_())

if __name__ == '__main__':
	main()