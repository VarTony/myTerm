import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { CommandService } from '..';

@Controller('commands')
export class CommandsController {

    constructor(
        private comandService: CommandService
    ) {}

    @Get()
    async testRedis(@Res() res: Response ) {
        // res.send(  await this.comandService('q') )
    }
}
