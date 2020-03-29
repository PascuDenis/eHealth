import { ISpecialists } from './iSpecialists';
export class Specialists implements ISpecialists {
    id: string;
    name: string;
    username: string;
    email: string;

    drId: string;
    specialization: string;

    telephoneNumber: number;
    streetAddress: string;
    city: string;
    state: string;
    profilePicturePath: string;
    isOnline: boolean;


    constructor(
        id: string,
        name: string,
        username: string,
        email: string,
        drId: string,
        specialization: string,
        telephoneNumber: number,
        streetAddress: string,
        city: string,
        state: string,
        profilePicturePath: string,
        isOnline: boolean
    ) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.drId = drId;
        this.specialization = specialization;
        this.telephoneNumber = telephoneNumber;
        this.streetAddress = streetAddress;
        this.city = city;
        this.state = state;
        this.profilePicturePath = profilePicturePath;
        this.isOnline = isOnline;
    }
}
