import { IbanChecksumCalculator } from "./iban.checksum.calculator"

describe('IbanChecksumCalculator', () => {
    let ibanChecksumCalculator = new IbanChecksumCalculator();

    describe('iban checksum calculation', () => {
        it('should return 44', () => {
            let accountIdentifier = '350700240388249600';
            let countryCode = 'DE';
            expect(ibanChecksumCalculator.calculate(accountIdentifier, countryCode)).toBe('44');
        });
        it('should return 02', () => {
            let accountIdentifier = '200505501015871393';
            let countryCode = 'DE';
            expect(ibanChecksumCalculator.calculate(accountIdentifier, countryCode)).toBe('02');
        });
        it('should find invalid account identifier', () => {
            expect(() => ibanChecksumCalculator.calculate(
                '1234567890123456789012345678901', 'DE'
            )).toThrow("BBAN must contain max of 30 letters or characters!");
            expect(() => ibanChecksumCalculator.calculate(
                '12345ABCD!', 'DE'
            )).toThrow("BBAN must contain only letters or characters!");
        });
        it('should find invalid country code', () => {
            expect(() => ibanChecksumCalculator.calculate(
                '200505501015871393', 'DEU'
            )).toThrow("Country code must contain exactly 2 letters!");
            expect(() => ibanChecksumCalculator.calculate(
                '200505501015871393', 'D'
            )).toThrow("Country code must contain exactly 2 letters!");
            expect(() => ibanChecksumCalculator.calculate(
                '200505501015871393', 'D3'
            )).toThrow("Country code must contain only letters!");
        });
    });

});