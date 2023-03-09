import { IbanChecksumCalculator } from "../checksum/iban.checksum.calculator";
import { DEBankAccountValidator } from "./de.bank.account.validator";

describe('DEBankAccountValidator', () => {
    let deBankAccountValidator = new DEBankAccountValidator(
        new IbanChecksumCalculator()
    );

    describe('configuration', () => {
        it('should have german country code', () => {
            expect(deBankAccountValidator.countryCode()).toBe("DE");
        });
        it('should have iban length of 22', () => {
            expect(deBankAccountValidator.ibanLength()).toBe(22);
        });
    });
    
    describe('iban validation', () => {
        it('should not find an error', () => {
            expect(() => deBankAccountValidator.validateIban("DE02200505501015871393")).not.toThrowError();
        });
        it('should find invalid country code', () => {
            expect(() => deBankAccountValidator.validateIban("AQ02200505501015871393")).toThrow("Country code is not valid!");
        });
        it('should find invalid iban length', () => {
            expect(() => deBankAccountValidator.validateIban("DE0220050550101587139")).toThrow("IBAN has wrong length!");
        });
        it('should find invalid iban checksum', () => {
            expect(() => deBankAccountValidator.validateIban("DE99200505501015871393")).toThrow("IBAN checksum is incorrect!");
        });
    });

    describe('bank code validation', () => {
        it('should not find an error', () => {
            expect(() => deBankAccountValidator.validateBankCode("20050550")).not.toThrowError();
        });
        it('should find invalid bank codes', () => {
            expect(() => deBankAccountValidator.validateBankCode("")).toThrow("Bank code must contain exactly 8 digits!");
            expect(() => deBankAccountValidator.validateBankCode("2005055A")).toThrow("Bank code must contain exactly 8 digits!");
            expect(() => deBankAccountValidator.validateBankCode("2005055")).toThrow("Bank code must contain exactly 8 digits!");
            expect(() => deBankAccountValidator.validateBankCode("220050550")).toThrow("Bank code must contain exactly 8 digits!");
        });
    });

    describe('branch code validation', () => {
        it('should not be supported', () => {
            expect(() => deBankAccountValidator.validateBranchCode("4711")).toThrow("Branch code is not supported in DE!");
        });
    })

    describe('account number validation', () => {        
        it('should not find an error', () => {
            expect(() => deBankAccountValidator.validateAccountNumber("1015871393")).not.toThrowError();
            expect(() => deBankAccountValidator.validateAccountNumber("101587139")).not.toThrowError();
            expect(() => deBankAccountValidator.validateAccountNumber("10158713")).not.toThrowError();
            expect(() => deBankAccountValidator.validateAccountNumber("1015871")).not.toThrowError();
            expect(() => deBankAccountValidator.validateAccountNumber("101587")).not.toThrowError();
            expect(() => deBankAccountValidator.validateAccountNumber("10158")).not.toThrowError();
            expect(() => deBankAccountValidator.validateAccountNumber("1015")).not.toThrowError();
            expect(() => deBankAccountValidator.validateAccountNumber("101")).not.toThrowError();
            expect(() => deBankAccountValidator.validateAccountNumber("10")).not.toThrowError();
            expect(() => deBankAccountValidator.validateAccountNumber("1")).not.toThrowError();
        });
        it('should find invalid account numbers', () => {
            expect(() => deBankAccountValidator.validateAccountNumber("")).toThrow("Account number must contain only a maximum of 10 digits!");
            expect(() => deBankAccountValidator.validateAccountNumber("10158713931")).toThrow("Account number must contain only a maximum of 10 digits!");
            expect(() => deBankAccountValidator.validateAccountNumber("101587139E")).toThrow("Account number must contain only a maximum of 10 digits!");
            expect(() => deBankAccountValidator.validateAccountNumber("ABCD")).toThrow("Account number must contain only a maximum of 10 digits!");
        });
    });

});