import { Injectable } from '@nestjs/common';

@Injectable()
export class TermService {
    // private readonly commands = {
    //     'ls' : this.ls,
    //     'cd': this.cd,
    //  'pwd' : this.pwd.read(true),
    //    'touch' : this.touch,
    //    'rm' : this.rm,
    //    'cat' : this.cat,
    //    'help' : this.help
    // };


    async commandHandler(command: string): Promise<any> {

    }
}
