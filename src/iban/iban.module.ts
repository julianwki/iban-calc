import { Module } from '@nestjs/common';
import { IbanChecksumCalculator } from './checksum/iban.checksum.calculator';
import { IbanController } from './iban.controller';
import { IbanService } from './iban.service';
import { DEBankAccountValidator } from './validation/de.bank.account.validator';

@Module({
  imports: [],
  controllers: [IbanController],
  providers: [IbanService, IbanChecksumCalculator, DEBankAccountValidator],
})
export class IbanModule {}
