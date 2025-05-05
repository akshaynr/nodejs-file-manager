import { EOL, cpus, homedir, userInfo } from 'node:os';
import { OS_COMMANDS } from './constants.js';

export const OS_EOL = EOL;

export const OS_ROOT_DIRECTORY = homedir();

export const executeOSCommand = (arg) => {
    switch (arg) {
        case OS_COMMANDS.EOL:
            console.log('EOL:', EOL);
            break;
        case OS_COMMANDS.CPUS:
            console.log('CPUS:', cpus());
            break;
        case OS_COMMANDS.HOME_DIR:
            console.log('Home Directory:', homedir());
            break;
        case OS_COMMANDS.USER_NAME:
            console.log('System Username:', userInfo().username);
            break;
        case OS_COMMANDS.ARCH:
            console.log('CPU Architecture for Node Binary:', process.arch);
            break;
        default:
            console.log(`Command not recognized: ${arg}`);
            break;
    }
}