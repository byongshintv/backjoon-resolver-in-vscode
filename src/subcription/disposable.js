const vscode = require('vscode');

let disposable = (context) => vscode.commands.registerCommand('backjoon-resolver.helloWorld', function () {
	vscode.window.showInformationMessage('Hello World from Backjoon-resolver!');
});
module.exports = disposable;