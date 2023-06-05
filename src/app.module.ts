import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TermController, TermService } from '@term/index';
import { RedisModule } from '@connections/index';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [ 
        path.join(__dirname, '../config/.env'), 
        path.join(__dirname, '../config/develop.env') 
    ],
    isGlobal: true 
  }),
    RedisModule
  ],
  controllers: [AppController, TermController],
  providers: [AppService, TermService],
})
export class AppModule {}
