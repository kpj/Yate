import json
from PyQt4 import QtWebKit, QtCore

import python.js_interface


class Viewer(QtWebKit.QWebView):
	def __init__(self):
		QtWebKit.QWebView.__init__(self)

		self.connect(
			self.page().mainFrame(), 
			QtCore.SIGNAL('loadFinished(bool)'), 
			self.loadFinished
		)
		self.connect(
			self.page().mainFrame(), 
			QtCore.SIGNAL('javaScriptWindowObjectCleared()'), 
			self.javaScriptWindowObjectCleared
		)

		self.load(QtCore.QUrl('./view/index.html'))

	def evtHandler(self, key, args):
		args = json.dumps(args)
		key = json.dumps(key)

		print("Events.__pyTrigger("+key+", "+args+")")
		self.page().mainFrame().evaluateJavaScript(
			"Events.__pyTrigger("+key+", "+args+")"
		)

	def keyPressEvent(self, e):
		self.evtHandler("keypress", [str(e.key())])

		QtWebKit.QWebView.keyPressEvent(self, e)

	def keyReleaseEvent(self, e):
		self.evtHandler("keyrelease", [str(e.key())])

		QtWebKit.QWebView.keyReleaseEvent(self, e)

	def loadFinished(self, ok):
		self.show()

	def javaScriptWindowObjectCleared(self):
		self.page().mainFrame().addToJavaScriptWindowObject(
			"PyInterface",
			python.js_interface.JavascriptInterface()
		)