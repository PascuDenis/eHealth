import { ItemTypes } from "./ItemTypes";

export class Items {
  id: string;
  name: string;
  date: string;
  type: ItemTypes;

  constructor(id: string, name: string, date: string, type: ItemTypes) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.type = type;
  }
}
