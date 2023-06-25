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
     * Удаление файла.
     * 
     * 
     * @param path 
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
     * Рекурсивное удаление директории.
     * 
     * @param isTree
     * @param path 
     */
    async removeDir(path: string, isTree: boolean = false ) {
        let result;
        try {
            const listRemoved = [];
            const dirStructure = await this.readDirRecursive(path, true);
            const onlyDirs = [];

            await Object.keys(dirStructure).forEach( async(filename: string) => {
                if(dirStructure[filename] === 'file') {
                    listRemoved.push(await this.removeFile(filename));
                    dirStructure[ filename ] = 'removed';
                } 
                else onlyDirs.push(filename);
            });
            await onlyDirs.reverse().forEach(dirpath => fs.rmdir(dirpath));
            
            result = isTree ? dirStructure : listRemoved;


        } catch(err) {
            console.warn(err);
            result = `Не удалось удалить директорию: ${ path }`;
            err.reason = result;
        }
        return result;
    }


    /**
     * Проверка на файловость
     * 
     * @param path 
     * @returns 
     */
    async isFile(path: string): Promise<boolean | string> {
        let result: boolean | string;
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


    /**
     * Копирует нужную директорию, по переданому вторым параметром пути.
     * 
     * @param copiedFile 
     * @param pathTo 
     */
    async copyDir(copiedDir: string, pathTo: string) {
        let result: string;
        try {
            fs.cp(copiedDir, pathTo, {recursive: true});
            result = `Файл ${ copiedDir } скопирован в ${ pathTo }`;
        } catch(err) {
            console.warn(err);
            result = `Не удалость скопировать файл ${ copiedDir }`;
            err.reason = result;
        }
        return result;
    }


    /**
     * Копирует нужный файл, по переданому вторым параметром пути.
     * 
     * @param copiedFile 
     * @param pathTo 
     */
    async copyFile(copiedFile: string, pathTo: string) {
        let result: string;
        try {
            fs.cp(copiedFile, pathTo);
            result = `Файл ${ copiedFile } скопирован в ${ pathTo }`;
        } catch(err) {
            console.warn(err);
            result = `Не удалость скопировать файл ${ copiedFile }`;
            err.reason = result;
        }
        return result;
    }


    /**
     * Создает директорию с заданым именем.
     * 
     * @param dirName 
     * @returns 
     */
    async createDir(dirName: string): Promise<string> {
        let result: string;
        try{
            fs.mkdir(dirName);
            result = `Cоздана директория ${ dirName }`;
        } catch(err) {
            console.warn(err);
            result = `Не удалось создать директорию ${ err }`;
            err.reason = result;
        }
        return result;
    }


    /**
     * Cоздание директории пользователя.
     * 
     * @param userId 
     */
    async createUserDir(userId: string) {}
}