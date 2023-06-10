import { Module } from '@nestjs/common';
import { CommandService } from '../service/commands.service';
import { FileSystemService } from '@fileSystem/index';

@Module({
    providers: [ CommandService, FileSystemService ],
    exports: [ FileSystemService ]
})
export class CommandsModule {}
