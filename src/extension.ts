// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Simulation Input Decks extension is now active');

	// Register a provider for editor rulers
	const editorChangeDisposable = vscode.window.onDidChangeActiveTextEditor((editor) => {
		if (editor) {
			console.log('Editor changed:', editor.document.fileName);
			updateRulers(editor);
		}
	});

	// Update rulers for the active editor when configuration changes
	const configChangeDisposable = vscode.workspace.onDidChangeConfiguration((e) => {
		if (e.affectsConfiguration('editor.rulers')) {
			const editor = vscode.window.activeTextEditor;
			if (editor) {
				console.log('Configuration changed, updating rulers');
				updateRulers(editor);
			}
		}
	});

	// Register the update rulers command
	const updateRulersCommand = vscode.commands.registerCommand('simulationInputDecks.updateRulers', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			console.log('Manual ruler update triggered');
			updateRulers(editor);
		}
	});

	// Update rulers for the initial active editor
	if (vscode.window.activeTextEditor) {
		console.log('Initial editor:', vscode.window.activeTextEditor.document.fileName);
		updateRulers(vscode.window.activeTextEditor);
	}

	// Add disposables to context
	context.subscriptions.push(editorChangeDisposable);
	context.subscriptions.push(configChangeDisposable);
	context.subscriptions.push(updateRulersCommand);
}

function updateRulers(editor: vscode.TextEditor) {
	const fileName = editor.document.fileName.toLowerCase();
	console.log('Updating rulers for:', fileName);

	// Get the workspace configuration
	const config = vscode.workspace.getConfiguration('editor', editor.document.uri);
	
	if (fileName.endsWith('.fem')) {
		// Generate rulers every 8 spaces up to 160 characters
		const femRulers = Array.from({ length: 20 }, (_, i) => (i + 1) * 8);
		console.log('Setting FEM rulers:', femRulers);
		config.update('rulers', femRulers, vscode.ConfigurationTarget.Workspace);
	} else if (fileName.endsWith('.rad')) {
		// Generate rulers every 10 spaces up to 160 characters
		const radRulers = Array.from({ length: 16 }, (_, i) => (i + 1) * 10);
		console.log('Setting RAD rulers:', radRulers);
		config.update('rulers', radRulers, vscode.ConfigurationTarget.Workspace);
	} else {
		// Reset rulers for other file types
		console.log('Resetting rulers for non-FEM/RAD file');
		config.update('rulers', [], vscode.ConfigurationTarget.Workspace);
	}
}

// This method is called when your extension is deactivated
export function deactivate() {
	console.log('Simulation Input Decks extension is now deactivated');
}
