import { stdin as input, stdout as output } from 'node:process';
import { getArgumentUserName, terminateProcess, executeCommand } from './utils.js';

// setDefaultEncoding();
const userName = getArgumentUserName();


console.log(`Welcome to the File Manager, ${userName}!`);

input.on('data', (data) => {
    const dataStr = data.toString().trim();
    console.log('Data received:', dataStr);
    const [command, arg1, arg2] = dataStr.trim().split(' ');
    console.log(`Command: ${command}, Arg1: ${arg1}, Arg2: ${arg2}`);

    executeCommand(command, arg1, arg2);
});

process.on('SIGINT', () => {
    terminateProcess(userName);
});