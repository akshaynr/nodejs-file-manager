import { argv, stdin, exit, cwd, chdir } from 'node:process';
import { FILE_MANAGER_COMMANDS, DIR_COMMANDS } from './constants.js';
import { navigateOneLevelUp, changeDirectory } from './dir-commands.js';
import { OS_EOL, OS_ROOT_DIRECTORY, executeOSCommand } from './os-commands.js';
import { listDirectoryContents } from './fs-commands.js';

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
        case DIR_COMMANDS.NAVIGATE_UP:
            navigateOneLevelUp();
            break;
        case DIR_COMMANDS.CHANGE_DIRECTORY:
            changeDirectory(arg1);
            break;
        case DIR_COMMANDS.LIST_FILES:
            listDirectoryContents();
            break;
        case FILE_MANAGER_COMMANDS.OS:
            executeOSCommand(arg1);
            break;
        default:
            invalidInputMsg(command);
            break;
    }
};

export const invalidInputMsg = (command) => console.log(`Invalid input: ${command}`);

export const operationFailedMsg = () => console.log(`Operation failed`);

export const setHomeDirectory = () => {
    chdir(OS_ROOT_DIRECTORY);
}

export const logWorkingDirectory = () => {
    console.log(`${OS_EOL}You are currently in ${cwd()}${OS_EOL}`);
}