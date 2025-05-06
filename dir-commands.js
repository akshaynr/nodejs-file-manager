import path from 'node:path';
import { cwd, chdir } from 'node:process';
import { statSync } from 'node:fs';
import { operationFailedMsg } from './utils.js';

export const navigateOneLevelUp = () => {
    try{
        const currentDirectory = process.cwd();
        const parentDirectory = currentDirectory.substring(0, currentDirectory.lastIndexOf('/'));

        if (currentDirectory === parentDirectory || parentDirectory === '') {
            console.log("You are already in the root directory.");
        } else {
            chdir(parentDirectory);
        }
    } catch (error) {
         operationFailedMsg();
    };   
};

export const changeDirectory = (pathToDirectory) => {
    try {
        const resolvedPath = path.resolve(cwd(), pathToDirectory);
        const stats = statSync(resolvedPath);

        if (!stats.isDirectory()) {
            console.log(`${pathToDirectory} is not a directory.`);
            return;
        }

        chdir(resolvedPath);
    } catch (error) {
        operationFailedMsg();
    }
};
