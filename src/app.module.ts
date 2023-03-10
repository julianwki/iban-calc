import { Module } from '@nestjs/common';
import { IbanModule } from './iban/iban.module';

@Module({
  imports: [IbanModule]
})
export class AppModule {}
