import { Injectable } from '@nestjs/common';
import * as fs from 'fs';


@Injectable()
export class FileSystemService {

    /**
     * Глубокое чтение директории.
     * 
     * @param dirPath 
     */
    async readDirRecursive(dirPath: string) {
        const files = await this.readDir(dirPath);
        const dirTree = await files.reduce( async(tree: {}, file: string) => 
         await this.isFile(file)
            ? ({...tree, [ file ]: 'file' })
            : ({...tree, [file]: (await this.readDirRecursive(file)) })
        , {});

        return dirTree;
    }


    /**
     * Проверка на файловость
     * 
     * @param path 
     * @returns 
     */
    private async isFile(path: string): Promise<any> {
        const result: any = await fs.stat(path, (err, stat) => { 
            if(err) console.warn(err);
            return stat.isFile();
        });
        return result;
    }


    /**
     * Плоское чтение директории
     * 
     * @param dirPath: путь до директории которую нужно прочитать.
     * @returns 
     */
    async readDir(dirPath: string): Promise<any> {
        const files: any = await fs.readdir(dirPath, (err, fileList) => {
            if(err) console.warn(err);
            return fileList;
        }); 
        return files;
    }

}