import { argv, stdin, exit, cwd, chdir } from 'node:process';
import { FILE_MANAGER_COMMANDS, DIR_COMMANDS, FS_COMMANDS, HASH_COMMANDS, ZIP_COMMANDS } from './constants.js';
import { navigateOneLevelUp, changeDirectory } from './dir-commands.js';
import { OS_EOL, OS_ROOT_DIRECTORY, executeOSCommand } from './os-commands.js';
import { addFile, copyFile, createDirectory, deleteFile, listDirectoryContents, moveFile, readFile, renameFile } from './fs-commands.js';
import { hashFile } from './hash-commands.js';
import { compressFile, decompressFile } from './zip-commands.js';

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
    console.log(`${OS_EOL}Thank you for using File Manager, ${username}, goodbye!`);
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
        case DIR_COMMANDS.LIST_FILES:
            listDirectoryContents();
            break;
        case HASH_COMMANDS.HASH:
            hashFile(arg1);
            break;
        case ZIP_COMMANDS.COMPRESS_FILE:
            compressFile(arg1, arg2);
            break;
        case ZIP_COMMANDS.DECOMPRESS_FILE:
            decompressFile(arg1, arg2);
            break;
        case FS_COMMANDS.CREATE_DIRECTORY:
            createDirectory(arg1);
            break;
        case FS_COMMANDS.ADD_FILE:
            addFile(arg1);
            break;
        case FS_COMMANDS.RENAME_FILE:
            renameFile(arg1, arg2);
            break;
        case FS_COMMANDS.COPY_FILE:
            copyFile(arg1, arg2);
            break;
        case FS_COMMANDS.DELETE_FILE:
            deleteFile(arg1);
            break;
        case FS_COMMANDS.MOVE_FILE:
            moveFile(arg1, arg2);
            break;
        case FS_COMMANDS.READ_FILE:
            readFile(arg1);
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