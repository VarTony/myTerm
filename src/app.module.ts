import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TermController } from './term/term.controller';
import { TermService } from './term/service/term.service';

@Module({
  imports: [],
  controllers: [AppController, TermController],
  providers: [AppService, TermService],
})
export class AppModule {}
