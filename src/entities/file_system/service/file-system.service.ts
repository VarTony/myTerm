import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as pathModule from 'path';


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
        let result: any;
        try {
            result = (await fs.readdir(this.fullPath(path)))
             .map(fileName => isInnerUse
                ? this.fullPath(fileName, [ path ])
                : fileName)
        } catch(err) {
            console.warn(err);
            result = `Не удалось прочитать директорию: ${ this.localPath(path, true) }`;
            err.reason = result;
        }
        return result;
    }


    /**
     * Глубокое чтение директории.
     * Возвращает n-ое дерево каталогов и файлов.
     * 
     * @param dirPath 
     */
    async readDirRecursive(path: string, isInnerUse: boolean = false ): Promise<any> {
        const pathHandler = isInnerUse 
            ? (path) => this.fullPath(path)
            : (path) => this.localPath(path);

        const files = await this.readDir(path, true);
        const dirTree = await files.reduce( async(promisedTree: any, file: string) => {
            // Ждем пока выполнется предыдущие обещание для корректной работы в следующем цикле.
            const tree = await promisedTree;
        
            return await this.isFile(file)
              ? ({...tree, [ pathHandler(file) ]: 'file' })
              : ({...tree, [ pathHandler(file) ]: (await this.readDirRecursive(file, isInnerUse)) })
         },  {});

        return dirTree;
    }


    /**
     * 
     * 
     * 
     * @param path 
     * 
     */
    async removeFile(path: string) {
        let result; 
        try {
            fs.unlink(path);
            result = `Файл был успешно удален: ${ path }`;
        } catch(err) {
            console.warn(path);
            result = `Не удалось удалить файл: ${ path }`;
        }
        return result;
    }


    /**
     * 
     * 
     * 
     * @param path 
     */
    async removeDir(path: string) {
        const dirStructure = await this.readDirRecursive(path, true);
        const result = await Object.keys(dirStructure).forEach( async(filename: string) => {
            if(dirStructure[filename] === 'file') {
                try {
                    await this.removeFile(filename);
                    dirStructure[filename] = 'removed';
                } catch(err) {
                    console.warn(err);
                }
            }
        return dirStructure;
        })




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
            result = `Не удалось определить тип файла: ${ this.localPath(path, true) }`;
            err.reason = result;
        }
        return result;
    }


    /**
     * Отделяет локальное имя файла.
     * Отрезает концевик пути(по умолчанию) либо внутриний путь в приложении.
     * 
     * @param filepath 
     * @returns 
     */
    localPath(filepath: string, isRelToRoot: boolean = false) {
        return isRelToRoot
        ? filepath.slice(this.__rootname.length)
        : filepath.split('/').slice(-1).join('');
    }


    /**
     * Формирует абсолютный путь к файлу
     * Если переданы дополнительные аргументы добавляет их перед или после
     *  обертываемого файла. 
     * 
     * @param filepath 
     * @returns 
     */
    fullPath(path: string, prev?: Array<string>, last?: Array<string> ): string {
        // Дополнительный блок, для кастомизации путей при необходимости
        if(prev) path = `${ prev.join('/') }/${ path }`;
        if(last) path = `${ path }/${ prev.join('/') }`;

        return path.includes(this.__rootname) 
            ? path
            : pathModule.join(this.__rootname, path)
    }
}