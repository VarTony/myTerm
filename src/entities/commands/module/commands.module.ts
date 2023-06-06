import { Module } from '@nestjs/common';
import { CommandService } from '../service/commands.service';

@Module({
    providers: [ CommandService ]
})
export class CommandsModule {}
