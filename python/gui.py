import json
from PyQt4 import QtWebKit, QtCore, QtGui

import python.js_interface


class MainWindow(QtGui.QMainWindow):
	def __init__(self, view):
		super(MainWindow, self).__init__()

		self.view = view

		self.setCentralWidget(view)
		self.initUI()

	def initUI(self):               
		self.statusBar()

		menubar = self.menuBar()
		fileMenu = menubar.addMenu('&File')
		for a in self.getFileMenu():
			fileMenu.addAction(a)
		
		self.setWindowTitle('Yate')    
		self.show()

	def openFileAction(self):
		self.view.evtHandler('openFile', [])

	def saveFileAction(self):
		self.view.evtHandler('saveFile', [])

	def getFileMenu(self):
		actions = []

		openFileAction = QtGui.QAction('&Open File', self)        
		openFileAction.setShortcut('Ctrl+O')
		openFileAction.setStatusTip('Open new file')
		openFileAction.triggered.connect(self.openFileAction)
		actions.append(openFileAction)

		saveFileAction = QtGui.QAction('&Save', self)        
		saveFileAction.setShortcut('Ctrl+S')
		saveFileAction.setStatusTip('Save current file')
		saveFileAction.triggered.connect(self.saveFileAction)
		actions.append(saveFileAction)

		exitAction = QtGui.QAction('&Exit', self)        
		exitAction.setShortcut('Ctrl+Q')
		exitAction.setStatusTip('Exit application')
		exitAction.triggered.connect(QtGui.qApp.quit)
		actions.append(exitAction)

		return actions

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
		#self.page().mainFrame().addToJavaScriptWindowObject(
		#	"PyInterface",
		#	python.js_interface.JavascriptInterface()
		#)
		pass