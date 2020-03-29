import { IUsers } from './iUsers';

export interface ISpecialists extends IUsers {
    drId: string;
    specialization: string;
}

