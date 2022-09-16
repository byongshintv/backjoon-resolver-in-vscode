const vscode = require('vscode');

// '문제 번호 읽기'라는 명령어를 등록한다.
let loadProblem = vscode.commands.registerCommand('backjoon-resolver.loadProblem', async function () {
	// 사용자가 문제 번호와 사용 언어를 입력 할 수 있는 입력창을 띄운다.
	let problemNumber = await vscode.window.showInputBox({ prompt: '문제 번호를 입력하세요.' })
	let language = await vscode.window.showInputBox({ prompt: '사용 언어를 입력하세요.' ,
		// 사용자가 입력한 언어가 지원되는 언어인지 확인한다.
		validateInput: (text) => {
			return text === "js"
		},
		// 사용자가 입력한 언어가 지원되는 언어가 아닐 경우 경고 메시지를 띄운다.
		placeHolder: "지원되는 언어는 js입니다."
		
	})

	// // 편집기를 열고 문제 번호와 사용 언어를 출력한다.
	// let editor = vscode.window.activeTextEditor;
	// editor.edit(editBuilder => {
	// 	editBuilder.insert(new vscode.Position(0, 0), `문제 번호: ${problemNumber}
	// 	사용 언어: ${language}`);
	// });

	// 출력 콘솔을 열고 문제 번호와 사용 언어를 출력한다.
	vscode.window.showInformationMessage(`문제 번호: ${problemNumber}
		사용 언어: ${language}`);


})
module.exports = loadProblem;
