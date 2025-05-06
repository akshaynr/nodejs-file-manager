import { stdin as input, stdout as output } from 'node:process';
import { getArgumentUserName, terminateProcess, executeCommand, logWorkingDirectory, setHomeDirectory } from './utils.js';

setHomeDirectory();

const userName = getArgumentUserName();

console.log(`Welcome to the File Manager, ${userName}!`);
output.write('> ');

input.on('data', (data) => {
    const dataStr = data.toString().trim();
    const [command, arg1, arg2] = dataStr.trim().split(' ');

    logWorkingDirectory();
    executeCommand(command, arg1, arg2);
    output.write('> ');
});

process.on('SIGINT', () => {
    terminateProcess(userName);
});