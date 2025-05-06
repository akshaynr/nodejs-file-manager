import { readdirSync, statSync, existsSync, writeFileSync, mkdirSync, unlinkSync, renameSync, createReadStream, createWriteStream } from 'node:fs';
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

export const checkDirectory = (directoryPath) => {
    try {
        const stats = statSync(directoryPath);
        return stats.isDirectory();
    } catch (error) {
        operationFailedMsg();
    }
};

export const checkFile = (filePath) => existsSync(filePath);

export const getFilePath = (fileName) => {
    try {
        const currentDirectory = cwd();
        const filePath = path.resolve(currentDirectory, fileName);
        return filePath;
    } catch (error) {
        operationFailedMsg();
    }
};

export const createDirectory = (directoryName) => {
    try {
        const currentDirectory = cwd();
        const newDirectoryPath = path.resolve(currentDirectory, directoryName);
        if (checkDirectory(newDirectoryPath)) {
            console.log(`Directory ${directoryName} already exists.`);
            return;
        }
        mkdirSync(newDirectoryPath);
        console.log(`Directory ${directoryName} created successfully.`);
    } catch (error) {
        operationFailedMsg();
    }
};
export const readFile = (fileName) => {
    try {
        const filePath = getFilePath(fileName);
        if (!checkFile(filePath)) {
            console.log(`File ${fileName} does not exist.`);
            return;
        }

        const readStream = createReadStream(filePath, { encoding: 'utf8' });

        readStream.on('data', (fileContent) => {
            console.log(`Content of ${fileName}:`);
            console.log(fileContent);
        });

        readStream.on('end', () => {
            console.log(`Finished reading file "${fileName}".`);
        });

        readStream.on('error', (error) => {
            console.error(`Failed to read file: ${error.message}`);
            operationFailedMsg();
        });
    } catch (error) {
        operationFailedMsg();
    }
};

export const addFile = (fileName, emptyContent = '') => {
    try {
        const filePath = getFilePath(fileName);
        if (checkFile(filePath)) {
            console.log(`File ${fileName} already exists.`);
            return;
        }
        writeFileSync(filePath, emptyContent, 'utf8');
        console.log(`File ${fileName} created successfully.`);
    } catch (error) {
        operationFailedMsg();
    }
};

export const deleteFile = (fileName) => {
    try {
        const filePath = getFilePath(fileName);
        if (!checkFile(filePath)) {
            console.log(`File ${fileName} does not exist.`);
            return;
        }
        unlinkSync(filePath);
        console.log(`File ${fileName} deleted successfully.`);
    } catch (error) {
        operationFailedMsg();
    }
};

export const renameFile = (filePath, newFileName) => {
    try {
        const newFilePath = getFilePath(newFileName);
        if (!checkFile(filePath)) {
            console.log(`File ${filePath} does not exist.`);
            return;
        }

        if (checkFile(newFilePath)) {
            console.log(`File ${newFileName} already exists.`);
            return;
        }

        renameSync(filePath, newFilePath);
        console.log(`File ${filePath} renamed to ${newFileName} successfully.`);
    } catch (error) {
        operationFailedMsg();
    }
};

export const copyFile = (filePath, destinationDirectory) => {
    try {
        const fileName = path.basename(filePath);
        const destinationPath = path.join(destinationDirectory, fileName);

        if (!checkFile(filePath)) {
            console.log(`File ${filePath} does not exist.`);
            return;
        }

        if (checkFile(destinationPath)) {
            console.log(`File ${destinationPath} already exists.`);
            return;
        }

        const readStream = createReadStream(filePath);
        const writeStream = createWriteStream(destinationPath);
        readStream.pipe(writeStream)
            .on('finish', () => {
                console.log(`File ${filePath} copied to ${destinationDirectory} successfully.`);
            })
            .on('error', (error) => {
                operationFailedMsg();
            });
    } catch (error) {
        operationFailedMsg();
    }
};

export const moveFile = (filePath, destinationDirectory) => {
    try {
        const fileName = path.basename(filePath);
        const destinationPath = path.join(destinationDirectory, fileName);

        if (!checkFile(filePath)) {
            console.log(`File ${filePath} does not exist.`);
            return;
        }

        if (checkFile(destinationPath)) {
            console.log(`File ${destinationPath} already exists.`);
            return;
        }

        const readStream = createReadStream(filePath);
        const writeStream = createWriteStream(destinationPath);
        readStream.pipe(writeStream)
            .on('finish', () => {
                unlinkSync(filePath);
                console.log(`File ${filePath} moved to ${destinationDirectory} successfully.`);
            })
            .on('error', (error) => {
                operationFailedMsg();
            });
    } catch (error) {
        operationFailedMsg();
    }
};
