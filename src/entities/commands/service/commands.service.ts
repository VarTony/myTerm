import { Inject, Injectable } from "@nestjs/common";
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { FileSystemService } from "@fileSystem/index";
import { helpCommand } from "../types";
import { descripionCommands } from "../constant";
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
     * 
     * @param command 
     * @returns
     */
    async help(command: helpCommand = 'help') {
        return descripionCommands[command];
    }


    /**
     * Команда вывода текущей рабочей директории.
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
     * Команда чтения каталога.
     * 
     * 
     * @param userName 
     * @param argument 
     * @param option 
     * @returns 
     */
    async ls(userName: string, argument: string = '', option?: '') { 
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


    async cd(userName: string) { }

    async mkdir(userName: string) { }

    async touch(userName: string) { }

    async rm(userName: string) { }

    async cat(userName: string) { }
} 