import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import path from 'node:path';
import { operationFailedMsg } from './utils.js';

const DEFAULT_ALGORITHM = 'sha256';

export const hashFile = (filePath, algorithm = DEFAULT_ALGORITHM) => {
    try{
        const hash = createHash(algorithm);
        const fileStream = createReadStream(path.resolve(filePath));

        fileStream.on('data', (chunk) => {
            hash.update(chunk);
        });
        fileStream.on('end', () => {
            const fileHash = hash.digest('hex');
            console.log(`Hash of ${filePath}:`, fileHash);
        });
        fileStream.on('error', (error) => {
            operationFailedMsg();
        });
    } catch(error){
        operationFailedMsg();
    }     
}