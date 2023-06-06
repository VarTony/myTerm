import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TermModule } from '@term/index';
import { RedisModule } from '@connections/index';
import { CommandsModule } from '@commands/index';
const path = require('path');

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [ 
        path.join(__dirname, '../config/.env'), 
        path.join(__dirname, '../config/develop.env') 
    ],
    isGlobal: true 
  }),
    RedisModule,
    CommandsModule,
    TermModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
