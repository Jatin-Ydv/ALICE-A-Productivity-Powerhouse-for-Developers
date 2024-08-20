import * as vscode from 'vscode';
import { exec, ExecException } from 'child_process';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
	const pythonPath = 'python'; // Adjust this if a specific Python interpreter is needed
	const requirementsPath = context.asAbsolutePath(path.join('ALICE-CORE', 'requirements.txt'));

	// Function to install requirements
	const installRequirements = () => {
		vscode.window.showInformationMessage('Installing ALICE dependencies...');
		exec(`${pythonPath} -m pip install -r ${requirementsPath}`, (error: ExecException | null, stdout: string, stderr: string) => {
			if (error) {
				vscode.window.showErrorMessage(`Error installing dependencies: ${stderr}`);
				return;
			}
			vscode.window.showInformationMessage('ALICE dependencies installed successfully.');
		});
	};

	// Command to start ALICE
	const startAlice = vscode.commands.registerCommand('extension.startALICE', () => {
		installRequirements();
		vscode.window.showInformationMessage('ALICE is waking up...');
		const aliceScript = context.asAbsolutePath('ALICE-CORE/assistant.py');
		exec(`${pythonPath} ${aliceScript}`, { cwd: context.extensionPath }, (error: ExecException | null, stdout: string, stderr: string) => {
			if (error) {
				vscode.window.showErrorMessage(`ALICE Error: ${stderr}`);
				return;
			}
			vscode.window.showInformationMessage(`ALICE: ${stdout}`);
		});
	});

	context.subscriptions.push(startAlice);
}

export function deactivate() {
	// Clean up if necessary
}
