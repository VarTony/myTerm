import { Body, Controller, Patch, Res } from '@nestjs/common';
import { Response } from 'express';
import { TermService } from '../service/term.service';
import { cbStream, cbStreamError, cbStreamEnd } from '@term/funcs/stream_callbacks';

@Controller('term')
export class TermController {

    constructor(
        private readonly service: TermService,
    ) {}

    @Patch('command')
    async commandHandler( 
     @Body() body: any,
     @Res() res: Response
     ): Promise<any> {
        const { command, options, argument } = body;
        const [ cb, cbEnd , cbErr  ] = [ cbStream(res), cbStreamEnd(res), cbStreamError(res) ];
        const result = await this.service.commandHandler(command, options, argument, { cb, cbEnd, cbErr });

        res.send({ result });
    }
}