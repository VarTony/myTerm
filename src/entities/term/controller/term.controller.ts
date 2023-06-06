import { Body, Controller, Patch, Res } from '@nestjs/common';
import { Response } from 'express';
import { TermService } from '../service/term.service';
import { CommandService } from '@commands/index';

@Controller('term')
export class TermController {

    constructor(
        private readonly service: TermService,
        // private comandService: CommandService
    ) {}

    @Patch('command')
    async commandHandler( 
     @Body() body: any,
     @Res() res: Response
     ): Promise<any> {
        const { command, options, argument } = body; 
        const result = await this.service.commandHandler(command, options, argument);
        // const result = await this.comandService.list['pwd'](command);

        res.send({ result });
    }
}