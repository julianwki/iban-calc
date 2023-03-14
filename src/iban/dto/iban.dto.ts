export class IbanDto {
  constructor(ibanBic: [string, string]) {
    this.iban = ibanBic[0];
    this.bic = ibanBic[1];
  }

  iban: string;
  bic: string;
}
