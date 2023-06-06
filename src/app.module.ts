import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@connections/index';
import { UserModule, TermModule } from '@entities/index';
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
    TermModule,
    UserModule
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {}
