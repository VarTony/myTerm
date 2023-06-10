import { Module } from '@nestjs/common';
import { TermController } from '../controller/term.controller';
import { TermService } from '../service/term.service';
import { CommandService } from '@commands/index';
import { FileSystemService } from '@fileSystem/index';

@Module({
    controllers: [ TermController ],
    providers: [ 
        TermService,
        CommandService,
        FileSystemService
    ]
})
export class TermModule {}
