// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Simulation Input Decks extension is now active');

	// Set up initial settings
	setupSettings();

	// Register a provider for editor rulers
	const editorChangeDisposable = vscode.window.onDidChangeActiveTextEditor((editor) => {
		if (editor) {
			console.log('Editor changed:', editor.document.fileName);
			updateSettings(editor);
		}
	});

	// Add disposables to context
	context.subscriptions.push(editorChangeDisposable);
}

function setupSettings() {
	try {
		// Get the workspace folder
		const workspaceFolders = vscode.workspace.workspaceFolders;
		if (!workspaceFolders) {
			console.log('No workspace folder found');
			return;
		}

		// Create .vscode directory if it doesn't exist
		const vscodeDir = path.join(workspaceFolders[0].uri.fsPath, '.vscode');
		if (!fs.existsSync(vscodeDir)) {
			fs.mkdirSync(vscodeDir);
		}

		// Path to settings.json
		const settingsPath = path.join(vscodeDir, 'settings.json');

		// Default settings
		const defaultSettings = {
			"[fem]": {
				"editor.rulers": Array.from({ length: 20 }, (_, i) => (i + 1) * 8)
			},
			"[rad]": {
				"editor.rulers": Array.from({ length: 16 }, (_, i) => (i + 1) * 10)
			},
			"files.associations": {
				"*.fem": "fem",
				"*.rad": "rad"
			}
		};

		// Read existing settings if they exist
		let currentSettings = {};
		if (fs.existsSync(settingsPath)) {
			const settingsContent = fs.readFileSync(settingsPath, 'utf8');
			try {
				currentSettings = JSON.parse(settingsContent);
			} catch (e) {
				console.error('Error parsing existing settings.json:', e);
			}
		}

		// Merge existing settings with our defaults
		const mergedSettings = {
			...currentSettings,
			...defaultSettings
		};

		// Write the merged settings back to settings.json
		fs.writeFileSync(settingsPath, JSON.stringify(mergedSettings, null, 4));
		console.log('Settings updated successfully');

	} catch (err) {
		console.error('Error setting up settings:', err);
	}
}

async function updateSettings(editor: vscode.TextEditor) {
	const fileName = editor.document.fileName.toLowerCase();
	console.log('Updating settings for:', fileName);

	try {
		// Get file extension in a cross-platform way
		const ext = path.extname(fileName).toLowerCase();
		console.log('File extension:', ext);
		
		// Determine if we have a workspace open
		const hasWorkspace = vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0;
		if (!hasWorkspace) {
			console.log('No workspace open, skipping settings update');
			return;
		}

		// Get the workspace folder
		const workspaceFolder = vscode.workspace.workspaceFolders![0];
		const vscodeDir = path.join(workspaceFolder.uri.fsPath, '.vscode');
		const settingsPath = path.join(vscodeDir, 'settings.json');

		// Read current settings
		let currentSettings: {
			'[fem]'?: { 'editor.rulers': number[] };
			'[rad]'?: { 'editor.rulers': number[] };
			'files.associations'?: { [key: string]: string };
			'editor.rulers'?: number[];
		} = {};

		if (fs.existsSync(settingsPath)) {
			const settingsContent = fs.readFileSync(settingsPath, 'utf8');
			try {
				currentSettings = JSON.parse(settingsContent);
			} catch (e) {
				console.error('Error parsing settings.json:', e);
			}
		}

		// Update settings based on file type
		if (ext === '.fem') {
			currentSettings['[fem]'] = {
				'editor.rulers': Array.from({ length: 20 }, (_, i) => (i + 1) * 8)
			};
			// Remove global rulers
			delete currentSettings['editor.rulers'];
		} else if (ext === '.rad') {
			currentSettings['[rad]'] = {
				'editor.rulers': Array.from({ length: 16 }, (_, i) => (i + 1) * 10)
			};
			// Remove global rulers
			delete currentSettings['editor.rulers'];
		} else {
			// For non-fem/rad files, ensure no rulers are set
			delete currentSettings['[fem]'];
			delete currentSettings['[rad]'];
			delete currentSettings['editor.rulers'];
		}

		// Ensure file associations are set
		currentSettings['files.associations'] = {
			'*.fem': 'fem',
			'*.rad': 'rad'
		};

		// Write the updated settings back to settings.json
		fs.writeFileSync(settingsPath, JSON.stringify(currentSettings, null, 4));
		console.log('Settings updated successfully');

	} catch (err) {
		console.error('Error updating settings:', err);
	}
}

// This method is called when your extension is deactivated
export function deactivate() {
	console.log('Simulation Input Decks extension is now deactivated');
}
