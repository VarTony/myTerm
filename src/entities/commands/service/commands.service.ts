import { Inject, Injectable } from "@nestjs/common";
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { FileSystemService } from "@fileSystem/index";
import { helpCommand } from "@commands/types";
import { descripionCommands } from "@commands/constant";
// const path = require('path');
// const fs = require('fs');

@Injectable()
export class CommandService {
    constructor(
        @Inject(CACHE_MANAGER) 
        private cache: Cache,
        private readonly fileSystem: FileSystemService
    ) {}


    async help(command: string = 'help') {
        return descripionCommands[command];
    }


    async pwd(userName: string): Promise< any | null > { 
        try { return await this.cache.get('123') } 
        catch(err) { console.warn(err) };
        
        return 'Что-то пошло не так!';
    }


    async ls(userName: string, argument: string = '', option?: '') { 
        const filePath = '/src/entities'; // test arg

        return await this.fileSystem.readDirRecursive(filePath);
    }

    async cd(userName: string) { }

    async mkdir(userName: string) { }

    async touch(userName: string) { }

    async rm(userName: string) { }

    async cat(userName: string) { }
} 