// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed


const disposable = require('./subcription/disposable')
const loadProblem = require('./subcription/loadProblem')
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// 환경변수 지정
	process.env.EXTENSION_ID = "undefined_publisher.backjoon-resolver"

	// 출력
	context.subscriptions.push(disposable(context));
	context.subscriptions.push(loadProblem(context));
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
