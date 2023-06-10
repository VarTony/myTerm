import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';


@Injectable()
export class FileSystemService {
    
    /**
     * Путь в корень проекта;
     */
    private readonly __rootname = __dirname
     .split('/')
     .slice(0, -4)
     .join('/');


    /**
     * Плоское чтение директории
     * 
     * @param dirPath: путь до директории которую нужно прочитать.
     * @returns 
     */
    async readDir(path: string, isInnerUse: boolean = false): Promise<any> {
        let files: any;
        try {
            files = (await fs.readdir(this.fullPath(path)))
             .map(fileName => isInnerUse
                ? this.fullPath(fileName, [ path ])
                : fileName)
        } catch(err) {
            console.warn(err);
            files = 'Что-то пошло не так.';
        }
        return files;
    }


    /**
     * Глубокое чтение директории.
     * Возвращает n-ое дерево каталогов и файлов.
     * 
     * @param dirPath 
     */
    async readDirRecursive(dirPath: string): Promise<any> {
        const files = await this.readDir(dirPath, true);
        const dirTree = await files.reduce( async(promisedTree: any, file: string) => {
            // Ждем пока выполнется обещание для корректной работы при следующей итерации.
            const tree = await promisedTree;
        
            return await this.isFile(file)
              ? ({...tree, [ this.localPath(file) ]: 'file' })
              : ({...tree, [ this.localPath(file) ]: (await this.readDirRecursive(file)) })
         },  {});

        return dirTree;
    }


    /**
     * Проверка на файловость
     * 
     * @param path 
     * @returns 
     */
    private async isFile(path: string): Promise<any> {
        let result: any;
        try {
            result = (await fs.stat(path)).isFile();
        } catch(err) {
            console.warn(err);
            result = 'Что-то пошло не так';
        }
        return result;
    }


    /**
     * Отделяет локальное имя файла.
     * Отрезает концевик пути.
     * 
     * @param filepath 
     * @returns 
     */
    localPath(filepath: string) {
        return filepath.split('/').slice(-1).join('');
    }


    /**
     * Формирует абсолютный путь к файлу
     * Если переданы дополнительные аргументы добавляет их перед или после
     *  обертываемого файла. 
     * 
     * @param filepath 
     * @returns 
     */
    fullPath(filepath: string, prev?: Array<string>, last?: Array<string> ): string {
        // Дополнительный блок, для кастомизации путей при необходимости
        if(prev) filepath = `${ prev.join('/') }/${ filepath }`;
        if(last) filepath = `${ filepath }/${ prev.join('/') }`;

        return filepath.includes(this.__rootname) 
            ? filepath
            : path.join(this.__rootname, filepath)
    }
}