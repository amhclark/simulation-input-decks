// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Register a provider for editor rulers
	const editorChangeDisposable = vscode.window.onDidChangeActiveTextEditor((editor) => {
		if (editor) {
			updateRulers(editor);
		}
	});

	// Update rulers for the active editor when configuration changes
	const configChangeDisposable = vscode.workspace.onDidChangeConfiguration((e) => {
		if (e.affectsConfiguration('simulationInputDecks') || e.affectsConfiguration('editor.rulers')) {
			const editor = vscode.window.activeTextEditor;
			if (editor) {
				updateRulers(editor);
			}
		}
	});

	// Update rulers for the initial active editor
	if (vscode.window.activeTextEditor) {
		updateRulers(vscode.window.activeTextEditor);
	}

	// Add disposables to context
	context.subscriptions.push(editorChangeDisposable);
	context.subscriptions.push(configChangeDisposable);
}

function updateRulers(editor: vscode.TextEditor) {
	const fileName = editor.document.fileName.toLowerCase();
	const config = vscode.workspace.getConfiguration('editor', editor.document.uri);
	const simConfig = vscode.workspace.getConfiguration('simulationInputDecks');
	
	if (fileName.endsWith('.fem')) {
		// Generate rulers every 8 spaces up to 160 characters
		const femRulers = Array.from({ length: 20 }, (_, i) => (i + 1) * 8);
		config.update('rulers', femRulers, vscode.ConfigurationTarget.Workspace);
	} else if (fileName.endsWith('.rad')) {
		// Generate rulers every 10 spaces up to 160 characters
		const radRulers = Array.from({ length: 16 }, (_, i) => (i + 1) * 10);
		config.update('rulers', radRulers, vscode.ConfigurationTarget.Workspace);
	} else {
		// Reset rulers for other file types
		config.update('rulers', [], vscode.ConfigurationTarget.Workspace);
	}
}

// This method is called when your extension is deactivated
export function deactivate() {}
