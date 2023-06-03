import { Body, Controller, Patch, Res } from '@nestjs/common';
import { Response } from 'express';
import { TermService } from '../service/term.service';

@Controller('term')
export class TermController {

    constructor(
        private readonly service: TermService
    ) {}

    @Patch('command')
    async commandHandler( 
     @Body() body: any,
     @Res() res: Response
     ): Promise<any> {
        const command: string = body.command; 
        const result = await this.service.commandHandler(command);

        res.send({ result });
    }
}


// app.post('/termComand',  (req, res) => {
// 	const cookie = req.headers.cookie
// 		?req.headers.cookie.split('=')[1].split(':')[1]
// 		:req.headers.cookie;  <---- AUTH

// 	if(!helpersOfTerm.searchUserDir(`user:${cookie}`)) {
// 		 userDirControler.answerOnNotExistUserDir(res);
// 		 return;
// 		}
//  let comand = req.body.comand.split(' ')[0];
//  let argument = req.body.comand.split(' ')[1];
//  let userName = req.headers.cookie.split('=')[1];
//  if(comands[comand]) argument ?comands[comand](userName, req, res, argument) :comands[comand](userName, req, res);
//  else res.send({'userString' : helpersOfTerm.getUserString(userName, req, res), 'type':'native', 'data':`Command '${comand}' not found.`});
// });