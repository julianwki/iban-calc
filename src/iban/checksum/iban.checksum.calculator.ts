import { Injectable } from "@nestjs/common";

@Injectable()
export class IbanChecksumCalculator {

    calculate(accountIdentifier: string, countryCode: string): string {
        if (accountIdentifier.length > 30) {
            throw new Error("Account identifier code must contain max of 30 letters or characters!");
        }
        if (!/^[A-Za-z0-9]*$/.test(accountIdentifier)) {
            throw new Error("Account identifier code must contain only letters or characters!");
        }
        if (countryCode.length != 2) {
            throw new Error("Country code must contain exactly 2 letters!");
        }
        if (!/^[A-Za-z]*$/.test(countryCode)) {
            throw new Error("Country code must contain only letters!");
        }
        let digits = this.convertToDigits(accountIdentifier + countryCode + '00');
        return this.calculateChecksum(digits).toString().padStart(2, '0');
    }

    private convertToDigits(str: string): bigint {
        var digits = '';
        for (var i = 0; i < str.length; i++) {
            let char = str.charAt(i);
            if (this.isDigit(char)) {
                digits += char;
            } else {
                digits += this.convertToNumber(char);
            }
        }
        return BigInt(digits);
    }

    private isDigit(char: string): boolean {
        return (char != null) && char.length == 1 && !isNaN(Number(char));
    }

    private convertToNumber(char: string): string {
        const offset = 87;
        let number = char.toLowerCase().charCodeAt(0) - offset;
        return number.toString();
    }

    private calculateChecksum(digits: bigint): bigint {
        const ninetyeight = BigInt(98);
        const ninetyseven = BigInt(97);
        return ninetyeight - (digits % ninetyseven);
    }
}