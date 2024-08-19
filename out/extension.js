"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const child_process_1 = require("child_process");
const path = __importStar(require("path"));
function activate(context) {
    const pythonPath = 'python'; // Adjust this if a specific Python interpreter is needed
    const requirementsPath = context.asAbsolutePath(path.join('VOICE-ASSISTANT', 'requirements.txt'));
    // Function to install requirements
    const installRequirements = () => {
        vscode.window.showInformationMessage('Installing ALICE dependencies...');
        (0, child_process_1.exec)(`${pythonPath} -m pip install -r ${requirementsPath}`, (error, stdout, stderr) => {
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
        const aliceScript = context.asAbsolutePath('VOICE-ASSISTANT/assistant.py');
        (0, child_process_1.exec)(`${pythonPath} ${aliceScript}`, { cwd: context.extensionPath }, (error, stdout, stderr) => {
            if (error) {
                vscode.window.showErrorMessage(`ALICE Error: ${stderr}`);
                return;
            }
            vscode.window.showInformationMessage(`ALICE: ${stdout}`);
        });
    });
    context.subscriptions.push(startAlice);
}
function deactivate() {
    // Clean up if necessary
}
//# sourceMappingURL=extension.js.map