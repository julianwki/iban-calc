import { Test, TestingModule } from "@nestjs/testing";
import { IbanModule } from "./iban.module";
import { IbanService } from "./iban.service"

describe('IbanService', () => {
    let ibanService: IbanService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [IbanModule]
        }).compile();

        ibanService = moduleRef.get<IbanService>(IbanService);
    });

    describe('iban check', () => {
        it('should not find an error', () => {
            expect(ibanService.checkIban("DE02200505501015871393")).toStrictEqual([true, "IBAN is valid"]);
        });
        it('should find invalid country code', () => {
            expect(ibanService.checkIban("AQ02200505501015871393")).toStrictEqual([false, "Currently only german bank details are supported!"]);
        });
        it('should find invalid iban length', () => {
            expect(ibanService.checkIban("DE0220050550101587139")).toStrictEqual([false, "IBAN has wrong length!"]);
        });
        it('should find invalid iban checksum', () => {
            expect(ibanService.checkIban("DE99200505501015871393")).toStrictEqual([false, "IBAN checksum is incorrect!"]);
        });
    })

    describe('iban calculation', () => {
        it('should calculate iban and bic', () => {
            expect(ibanService.calculateIbanAndBic("DE", "20050550", "", "1015871393")).toStrictEqual(["DE02200505501015871393", ""]);
        });
        it('should find invalid country code', () => {
            expect(() => ibanService.calculateIbanAndBic("AQ", "20050550", "", "1015871393")).toThrow("Currently only german bank details are supported!");
        });
    })
})