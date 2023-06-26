import { Inject, Injectable } from '@nestjs/common';
import { CommandService } from '@commands/index';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { catOptions } from '@commands/types';
import { bufferEncoding } from '@fileSystem/types';
import { commands, commandsOptions } from '@commands/types/service.types';
const path = require('path');

@Injectable()
// @CommandService()
export class TermService {
    constructor(
        @Inject(CACHE_MANAGER) private cache: Cache, 
        private readonly commands: CommandService
    ){}
   
    async commandHandler(
        command: commands, 
        options?: commandsOptions,
        argument?: string, 
        callbacksPack?: any): Promise<any> {
        let result;
        if(options === '-h') 
           return (await this.commands['help'](command));
    

        if(command === 'cat') {
            // this.commands[command](argument, options, callbacksPack)
        } 

        // return await this.commands[command](argument, options);
    }


    async ast(command: string) {}
}
