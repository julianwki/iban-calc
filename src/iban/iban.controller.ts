import { Body, Controller, Post } from '@nestjs/common';
import { BankAccountDto } from './dto/bank.account.dto';
import { IbanDto } from './dto/iban.dto';
import { IbanService } from './iban.service';

@Controller('iban')
export class IbanController {
  constructor(private ibanService: IbanService) {}

  @Post('calculate')
  calculate(@Body() bankAccountDto: BankAccountDto) {
    let ibanBic = this.ibanService.calculateIbanAndBic(
      bankAccountDto.countryCode,
      bankAccountDto.bankCode,
      bankAccountDto.branchCode,
      bankAccountDto.accountNumber,
    );
    return new IbanDto(ibanBic);
  }

  @Post('check')
  check(@Body() ibanDto: IbanDto) {
    return this.ibanService.checkIban(ibanDto.iban);
  }
}
