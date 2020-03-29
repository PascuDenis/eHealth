import { IDrugs } from "./iDrugs";

export class DrugAdministration {
  drug: IDrugs;
  administrationTime: string;
  repeatAfterHour: number
  cycle: number;
  dose: number;

  constructor(
    drug: IDrugs,
    administrationTime: string,
    repeatAfterHour: number,
    cycle: number,
    dose: number
  ) {
    this.drug = drug;
    this.administrationTime = administrationTime;
    this.repeatAfterHour = repeatAfterHour;
    this.cycle = cycle;
    this.dose = dose;
  }
}
