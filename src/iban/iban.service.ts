import { Injectable } from '@nestjs/common';
import { IbanChecksumCalculator } from './checksum/iban.checksum.calculator';
import { DEBankAccountValidator } from './validation/de.bank.account.validator';

@Injectable()
export class IbanService {
  constructor(
    private ibanChecksumCalculator: IbanChecksumCalculator,
    private deBankAccountValidator: DEBankAccountValidator,
  ) {}

  calculateIbanAndBic(
    countryCode: string,
    bankCode: string,
    branchCode: string,
    accountNumber: string,
  ): [string, string] {
    this.validateCountryCode(countryCode);
    this.deBankAccountValidator.validateBankCode(bankCode);
    let bban = bankCode + this.normalizeAccountNumber(accountNumber);
    let checksum = this.ibanChecksumCalculator.calculate(bban, countryCode);
    let iban = countryCode + checksum + bban;
    let bic = '';
    return [iban, bic];
  }

  private normalizeAccountNumber(accountNumber: string): string {
    this.deBankAccountValidator.validateAccountNumber(accountNumber);
    return accountNumber.padStart(10, '0');
  }

  checkIban(iban: string): [boolean, string] {
    try {
      this.validateCountryCode(iban.substring(0, 2));
      this.deBankAccountValidator.validateIban(iban);
      return [true, 'IBAN is valid'];
    } catch (e: any) {
      return [false, e.message];
    }
  }

  private validateCountryCode(countryCode: string) {
    if (countryCode != 'DE') {
      throw new Error('Currently only german bank details are supported!');
    }
  }
}
