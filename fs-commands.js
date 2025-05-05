import { readdirSync, statSync } from 'node:fs';
import { cwd } from 'node:process';
import path from 'node:path';
import { operationFailedMsg } from './utils.js';

export const listDirectoryContents = () => {
    try {
        const currentDirectory = cwd();
        const files = readdirSync(currentDirectory);
        const directoryFilesList = [];

        for (const file of files) {
            const filePath = path.join(currentDirectory, file);
            const isDirectory = statSync(filePath).isDirectory();
            if (isDirectory) {
                directoryFilesList.push({ Name: file, Type: 'directory' });
            } else {
                directoryFilesList.push({ Name: file, Type: 'file' });
            }
        }
        console.table(directoryFilesList);
    } catch (error) {
        operationFailedMsg();
    }
};