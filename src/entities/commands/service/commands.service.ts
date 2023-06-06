import { Inject, Injectable } from "@nestjs/common";
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
// const path = require('path');
// const fs = require('fs');

@Injectable()
export class CommandService {
    
    public readonly list = {
     pwd: command => this.pwd(command),
     ls: command => this.ls(command),
     cd: command => this.cd(command),
     touch: command => this.touch(command),
     rm: command => this.rm(command),
     cat: command => this.cat(command),
     help: command => this.help(command)
    }

    constructor(
        @Inject(CACHE_MANAGER) private cache: Cache
    ) {}

    async pwd(userName: string): Promise< any | null > { 
        try { return await this.cache.get('123') } 
        catch(err) { console.warn(err) };
        
        return 'Что-то пошло не так!';
    }


    private async ls(userName: string) { }

    private async cd(userName: string) { }

    private async touch(userName: string) { }

    private async rm(userName: string) { }

    private async cat(userName: string) { }

    private async help(userName: string) {}
} 