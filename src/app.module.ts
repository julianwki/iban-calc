import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IbanModule } from './iban/iban.module';

@Module({
  imports: [IbanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
