import { Module } from '@nestjs/common';
import { CommandService } from '../service/commands.service';
import { CommandsController } from '../controller/commands.controller';

@Module({
    controllers: [ CommandsController ],
    providers: [ CommandService ]
})
export class CommandsModule {}
