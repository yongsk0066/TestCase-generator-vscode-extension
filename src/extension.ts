// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { SidebarProvider } from "./SidebarProvider";
import { gen } from "./caseGenerator";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    const sidebarProvider = new SidebarProvider(context.extensionUri);
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "dgu-extension" is now active!');
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider("dgu-sidebar", sidebarProvider)
    );
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand("dgu-extension.testCase", () => {
        // The code you place here will be executed every time your command is executed
        // 에디터 긁어고
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection;

            const word = document.getText(selection);
            // ex "python/string/9/3-10"
            //  language / type / iteration / range
            const config = word.split("/");

            const generatedWord = gen(word);
            editor.edit((editBuilder) => {
                editBuilder.replace(selection, generatedWord);
            });
        }

        vscode.window.showInformationMessage("Hello World from dgu-extension!");
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
