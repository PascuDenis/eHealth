import { DrugAdministration } from "./DrugAdministration";

export class Treatments {
  id: string;
  specialistId: string;
  name: string;
  date: string;
  description: string;
  drugAdministration: DrugAdministration[];

  constructor(
    id: string,
    specialistId: string,
    name: string,
    date: string,
    description: string,
    drugAdministration: DrugAdministration[]
  ) {
    this.id = id;
    this.specialistId = specialistId;
    this.name = name;
    this.date = date;
    this.description = description;
    this.drugAdministration = drugAdministration;
  }
}
