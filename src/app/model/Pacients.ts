import { IPactients } from "./iPacients";
import { Items } from './Items';

export class Pacients implements IPactients {
  id: string;
  name: string;
  username: string;
  email: string;
  telephoneNumber: number;
  streetAddress: string;
  city: string;
  state: string;
  profilePicturePath: string;
  isOnline: boolean;

  birthdate: number;
  weight: number;
  height: number;
  sex: string;
  observations: Items[];
  problems: Items[];
  allergies: Items[];
  medication: string[];

  constructor(
    id: string,
    name: string,
    username: string,
    email: string,
    telephoneNumber: number,
    streetAddress: string,
    city: string,
    state: string,
    profilePicturePath: string,
    isOnline: boolean,

    birthdate: number,
    weight: number,
    height: number,
    sex: string,
    observations: Items[],
    problems: Items[],
    allergies: Items[],
    medication: string[]
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.telephoneNumber = telephoneNumber;
    this.streetAddress = streetAddress;
    this.city = city;
    this.state = state;
    this.profilePicturePath = profilePicturePath;
    this.isOnline = isOnline;

    this.birthdate = birthdate;
    this.weight = weight;
    this.height = height;
    this.sex = sex;
    this.observations = observations;
    this.problems = problems;
    this.allergies = allergies;
    this.medication = medication;
  }
}
