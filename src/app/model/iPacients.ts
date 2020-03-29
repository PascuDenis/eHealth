import { IUsers } from "./iUsers";
import { Items } from './Items';

export interface IPactients extends IUsers {
  birthdate: number;
  weight: number;
  height: number;
  sex: string;
  observations: Items[];
  problems: Items[];
  allergies: Items[];
  medication: string[];
}
