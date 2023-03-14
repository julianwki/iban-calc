import { Injectable } from '@nestjs/common';
import { IbanChecksumCalculator } from '../checksum/iban.checksum.calculator';
import { AbstractBankAccountValidator } from './abstract.bank.account.validator';

@Injectable()
export class DEBankAccountValidator extends AbstractBankAccountValidator {
  constructor(ibanChecksumCalculator: IbanChecksumCalculator) {
    super(ibanChecksumCalculator);
  }

  override countryCode() {
    return 'DE';
  }

  override ibanLength() {
    return 22;
  }

  override validateBankCode(bankCode: string) {
    if (bankCode.length != 8 || !/^\d+$/.test(bankCode)) {
      throw new Error('Bank code must contain exactly 8 digits!');
    }
  }

  override validateAccountNumber(accountNumber: string) {
    if (accountNumber.length > 10 || !/^\d+$/.test(accountNumber)) {
      throw new Error(
        'Account number must contain only a maximum of 10 digits!',
      );
    }
  }
}
