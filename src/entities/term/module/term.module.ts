import { Module } from '@nestjs/common';
import { TermController } from '../controller/term.controller';
import { TermService } from '../service/term.service';
import { RedisModule } from '@connections/redis.connection';
import { CommandService } from '@commands/index';

@Module({
    controllers: [ TermController ],
    providers: [ TermService, CommandService ]
})
export class TermModule {}
