import { IbanChecksumCalculator } from "../checksum/iban.checksum.calculator";

export abstract class AbstractBankAccountValidator {

    constructor(protected ibanChecksumCalculator: IbanChecksumCalculator) {}

    abstract countryCode(): string;
    abstract ibanLength(): number;

    validateIban(iban: string) {
        let countryCode = iban.substring(0,2);
        if (countryCode != this.countryCode()) {
            throw new Error("Country code is not valid!");
        }
        if (iban.length != this.ibanLength()) {
            throw new Error("IBAN has wrong length!");
        }
        let bban = iban.substring(4, this.ibanLength());
        let checksum = this.ibanChecksumCalculator.calculate(bban, countryCode);
        if (checksum != iban.substring(2, 4)) {
            throw new Error("IBAN checksum is incorrect!");
        }
    }

    validateBankCode(bankCode: string) {
        throw new Error(`Bank code is not supported in ${this.countryCode()}!`);
    }

    validateBranchCode(branchCode: string) {
        throw new Error(`Branch code is not supported in ${this.countryCode()}!`);
    }

    validateAccountNumber(accountNumber: string) {
        throw new Error(`Account number is not supported in ${this.countryCode()}!`);
    }

}