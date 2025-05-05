import { argv, stdin, exit } from 'node:process';
import { FILE_MANAGER_COMMANDS } from './constants.js';
import { executeOSCommand } from './os-commands.js';

export const setDefaultEncoding = (encoding = 'utf8') => stdin.setEncoding(encoding);

export const getArgumentUserName = () => {
    const args = argv.slice(2);
    const userNameArg = args.find(arg => arg.startsWith('--username='));

    if(args.length === 0 || !userNameArg) {
        console.log('No username provided');
    }

    if(!userNameArg.split('=')?.[1]) {
        console.log('Invalid username provided');
    }

    return userNameArg ? userNameArg.split('=')[1] : null;
}

export const terminateProcess = (username) => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    exit();
}

export const executeCommand = (command, arg1, arg2) => {
    const username = getArgumentUserName();
    switch (command) {
        case FILE_MANAGER_COMMANDS.EXIT:
            terminateProcess(username);
            break;
        case FILE_MANAGER_COMMANDS.OS:
            executeOSCommand(arg1);
            break;
        default:
            invalidCommand(command);
            break;
    }
};

export const invalidCommand = (command) => console.log(`Command not recognized: ${command}`);