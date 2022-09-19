const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

// 프로젝트에서 사용 할 경로를 초기화하고 워크벤치 폴더를 반환한다.
function initPathSystem({
	globalStoragePath, problemNumber, language
} = {}){
	// extensionPath 없으면 생성
	if (!fs.existsSync(globalStoragePath)) fs.mkdirSync(globalStoragePath);

	// extensionPath 하위 경로에 problems 폴더가 없으면 생성
	const workbenchPath = path.join(globalStoragePath, 'problems');
	if(!fs.existsSync(workbenchPath)) fs.mkdirSync(workbenchPath);
	let problemPath;
	if(problemNumber){
		// 문제 번호 폴더가 없으면 생성
		problemPath = path.join(workbenchPath, problemNumber);
		if(!fs.existsSync(problemPath)) fs.mkdirSync(problemPath);
	}

	let needFileList = {
		source : `main.${language}`,
		inout : `inout.json`,
		problem :  `problem.html`,
	}
	let needFilePath = {};
	for(let key in needFileList){
		needFilePath[key] = path.join(problemPath, needFileList[key]);
		
		// 해당 경로에 파일이 없으면 생성
		if(!fs.existsSync(needFilePath[key])) fs.writeFileSync(needFilePath[key], '');
	}

	return {
		workbenchPath,
		problemPath,
		filePath:needFilePath,
	};
}

// '문제 번호 읽기'라는 명령어를 등록한다.
let loadProblem = (context) => vscode.commands.registerCommand('backjoon-resolver.loadProblem', async function (...args) {
	const globalStoragePath = context.globalStoragePath;

	// // 사용자가 문제 번호와 사용 언어를 입력 할 수 있는 입력창을 띄운다.
	// let problemNumber = await vscode.window.showInputBox({ prompt: '문제 번호를 입력하세요.' })
	// let language = await vscode.window.showInputBox({ prompt: '사용 언어를 입력하세요.' ,
	// 	// 사용자가 입력한 언어가 지원되는 언어인지 확인한다.
	// 	validateInput: (text) => {
	// 		return text === "js"
	// 	},
	// 	// 사용자가 입력한 언어가 지원되는 언어가 아닐 경우 경고 메시지를 띄운다.
	// 	placeHolder: "지원되는 언어는 js입니다."
		
	// })

	let [problemNumber, language] = ['1000','js'];

	// filePath는 source, inout, problem라는 하위 경로를 가진 객체
	let {
		workbenchPath,
		problemPath,
		filePath
	} = initPathSystem({
		globalStoragePath,
		problemNumber, language
	})



	//workbenchPath를 작업 공간으로 설정한다.
	vscode.workspace.updateWorkspaceFolders(0, 0, { uri: vscode.Uri.file(workbenchPath) });

	// open editor group in left side filePath.source
	vscode.commands.executeCommand('vscode.open', vscode.Uri.file(filePath.source), vscode.ViewColumn.One);

	// open editor group in right side filePath.problem by web priview
	//vscode.commands.executeCommand('vscode.open', vscode.Uri.file(filePath.problem), vscode.ViewColumn.Two);
	vscode.commands.executeCommand('vscode.previewHtml', vscode.Uri.file(filePath.problem), vscode.ViewColumn.Two);

	// observer file change filePath.problem by fs.watch
	fs.watch(filePath.problem, (eventType, filename) => {
		if (filename) {
			vscode.commands.executeCommand('workbench.action.webview.reloadWebviewAction');
			console.log("reloadedwebview")
		}
	}) 





		


})
module.exports = loadProblem;
