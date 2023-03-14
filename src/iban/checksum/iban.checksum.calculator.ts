import { Injectable } from '@nestjs/common';

@Injectable()
export class IbanChecksumCalculator {
  calculate(bban: string, countryCode: string) {
    if (bban.length > 30) {
      throw new Error('BBAN must contain max of 30 letters or characters!');
    }
    if (!/^[A-Za-z0-9]*$/.test(bban)) {
      throw new Error('BBAN must contain only letters or characters!');
    }
    if (countryCode.length != 2) {
      throw new Error('Country code must contain exactly 2 letters!');
    }
    if (!/^[A-Za-z]*$/.test(countryCode)) {
      throw new Error('Country code must contain only letters!');
    }
    let digits = this.convertToDigits(bban + countryCode + '00');
    return this.calculateChecksum(digits);
  }

  private convertToDigits(str: string) {
    return str
      .split('')
      .map((c) => (this.isDigit(c) ? c : this.convertToNumber(c)))
      .join('');
  }

  private isDigit(char: string) {
    return char != null && char.length == 1 && !isNaN(Number(char));
  }

  private convertToNumber(char: string) {
    const offset = 87;
    let number = char.toLowerCase().charCodeAt(0) - offset;
    return number.toString();
  }

  private calculateChecksum(digits: string) {
    let number = BigInt(digits);
    const ninetyeight = BigInt(98);
    const ninetyseven = BigInt(97);
    let checksum = ninetyeight - (number % ninetyseven);
    return checksum.toString().padStart(2, '0');
  }
}
