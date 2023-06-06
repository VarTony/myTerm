import { Inject, Injectable } from '@nestjs/common';
import { CommandService } from '@commands/index';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
const path = require('path');

@Injectable()
export class TermService {
    constructor(
        @Inject(CACHE_MANAGER) private cache: Cache, 
        private readonly commands: CommandService
    ){}
   
    async commandHandler(
        command: string, 
        options?: string,
        argument?: string ): Promise<any> {

        return await this.commands[command](argument, options);
    }


    async ast(command: string) {}
}
