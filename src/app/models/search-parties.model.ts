export class SearchPartiesModel {
  id!: number;
  name!: string;
  rating!: string;
  creditAnalyst!: string;
  secondCreditAnalyst!: string;
  creditOffice!: string;
  secondAnalystOffice!: string;
  country!: string;
  countryISO!: string;
  riskCountry!: string;
  riskCountryISO!: string;              
  limit!: number;
  exposure!: number;
  available!: number;
  utilisationPct!: string;
  maxPFEUnsecured!: number;
  category!: string;
  region!: string;
  riskRegion!: string;
  industry!: string;
  role!: string;
  aliasType!: string;
  alias!: string;
  nextCreditAssesmentDate!: Date;
  lastCreditAssesmentDate!: Date;
  active!: number;
  status!: string;
}
