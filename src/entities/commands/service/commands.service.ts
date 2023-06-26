import { Inject, Injectable } from "@nestjs/common";
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { FileSystemService } from "@fileSystem/index";
import { helpCommand } from "../types";
import { descripionCommands } from "../constant";
import { bufferEncoding, streamsCallbackPack } from "@fileSystem/types";
// const path = require('path');
// const fs = require('fs');

@Injectable()
export class CommandService {
    constructor(
        @Inject(CACHE_MANAGER) 
        private cache: Cache,
        private readonly fileSystem: FileSystemService
    ) {}


    /**
     * Команда вывода общей справки или дополнительной информации по командам.
     * 
     * @param command 
     * @returns
     */
    async help(command: helpCommand = 'help') {
        return descripionCommands[command];
    }


    /**
     * Аналог pwd, командной оболочки unix.
     * 
     * @param userName 
     * @returns 
     */
    async pwd(userName: string): Promise< any | null > { 
        let result;
        try { 
            const pathWorDir = await this.cache.get('123');
            result = pathWorDir ? pathWorDir : 'Путь не найден.';
        } 
        catch(err) { 
            console.warn(err);
            result = 'Не удвлось загрузить путь.'
        };
        
        return result;
    }


    /**
     * Аналог cat, командной оболочки unix.
     * 
     * @param filepath 
     */
    async cat(filepath: string,  encoding: bufferEncoding = 'utf8', callbacks?: streamsCallbackPack) { 
        await this.fileSystem.readFile(filepath, encoding, callbacks);
    }


    /**
     *  Аналог ls, командной оболочки unix.
     * 
     * @param userName 
     * @param argument 
     * @param option 
     * @returns 
     */
    async ls(argument: string = '', option?: '') { 
        const filePath = '/src/entities'; // test arg

        let result;
        try {
            result = await this.fileSystem.readDirRecursive(filePath);
        } catch(err) {
            console.warn(err);
            result = err.reason;
        }
        return result;
    }


    /**
     * Аналог cp, командной оболочки unix.
     * 
     * @param copiedFile 
     * @param pathTo 
     * @returns 
     */
    async cp(filepath: string, pathTo: string): Promise<string> { 
        let result: string;
        try {
           const isFile = await this.fileSystem.isFile(filepath);
           result = isFile
                ? await this.fileSystem.copyFile(filepath, pathTo) 
                : await this.fileSystem.copyDir(filepath, pathTo);
        } catch (err) {
            console.warn(err);
            result = err.reason;
        }
        return result;
    }


    /**
     * Аналог rm, командной оболочки unix.
     * 
     * @param userName 
     */
    async rm(filepath: string) {
        let result: string;
        try {
            const isFile =  await this.fileSystem.isFile(filepath);
            result = isFile 
                ? await this.fileSystem.removeFile(filepath)
                : await this.fileSystem.removeDir(filepath);
        } catch(err) {
            console.warn(err);
            result = err.reason;
        }
        return result;
    }


    /**
     * Аналог mkdir, командной оболочки unix.
     * 
     * @param dirpath 
     * @returns 
     */
    async mkdir(dirpath: string): Promise<string> {
        let result: string;
        try {
            result = await this.fileSystem.createDir(dirpath);
        } catch(err) {
            console.warn(err);
            result = err.reason;
        }
        return result;
    }


    /**
     * (Урезанный) Аналог touch, командной оболочки unix.
     * 
     * @param filepath 
     */
    async touch(filepath: string) { 
        let result: string;
        try {
            result = await this.fileSystem.createFile(filepath);
        } catch(err) {
            console.warn(err);
            result = err.reason;
        }
        return result;
    }

    async cd(userName: string) { }

} 