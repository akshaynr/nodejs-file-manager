import { EOL, cpus, homedir, userInfo, arch } from 'node:os'
 
const OS_COMMANDS = {
    EOL: '--EOL',
    CPUS: '--cpus',
    HOME_DIR: '--homedir',
    USER_NAME: '--username',
    ARCH: '--architecture',
}


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