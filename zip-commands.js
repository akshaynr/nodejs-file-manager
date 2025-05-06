import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { operationFailedMsg } from './utils.js';
import { checkDirectory, checkFile } from './fs-commands.js';

export const compressFile = (srcPath, destPath) => {
    try {
        const filePath = path.resolve(srcPath);
        const fileName = path.basename(filePath);
        const fileDestPath = path.resolve(destPath);
        const compressedFileDestPath = path.join(fileDestPath, `${fileName}.br`);

        if(!checkFile(filePath)) {
            console.log(`File ${filePath} does not exist.`);
            return;
        }

        if(!checkDirectory(fileDestPath)) {
            console.log(`Directory ${destPath} does not exist.`);
            return;
        }

        const readStream = createReadStream(filePath);
        const writeStream = createWriteStream(compressedFileDestPath);
        const brotliCompress = createBrotliCompress();

        readStream.pipe(brotliCompress).pipe(writeStream);

        writeStream.on('finish', () => {
            console.log(`File ${filePath} compressed to ${compressedFileDestPath}`);
        });

        writeStream.on('error', (error) => {
            operationFailedMsg();
        });
    } catch(error) {
        operationFailedMsg();
    }

}

export const decompressFile = (srcPath, destPath) => {
    try {
        const srcFilePath = path.resolve(srcPath);
    const fileName = path.basename(srcFilePath);
    const originalFileName = fileName.replace(/\.br$/, '');
    const destFilePath = path.resolve(destPath);
    const decompressedFilePath = path.join(destFilePath, originalFileName);    

    if (!checkFile(srcFilePath)) {
        console.log(`File "${srcPath}" does not exist.`);
        return;
    }

    if (!checkDirectory(destFilePath)) {
        console.log(`Directory "${destPath}" does not exist.`);
        return;
    }

    const readStream = createReadStream(srcFilePath);
    const writeStream = createWriteStream(decompressedFilePath);
    const brotliDecompress = createBrotliDecompress();

    readStream.pipe(brotliDecompress).pipe(writeStream);

    writeStream.on('finish', () => {
        console.log(`File "${srcPath}" decompressed successfully to "${resolvedDestPath}".`);
    });

    writeStream.on('error', (error) => {
        console.error(`Failed to decompress file: ${error.message}`);
        operationFailedMsg();
    });
    } catch (error) {
        operationFailedMsg();
    }
}