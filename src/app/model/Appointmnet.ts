import { Event } from './Event';

export class Appointment {
  id: string;
  specialistId: string;
  pacientId: string;
  event: Event;

  constructor(
    id: string,
    specialistId: string,
    pacientId: string,
    event: Event
  ) {
    this.id = id;
    this.specialistId = specialistId;
    this.pacientId = pacientId;
    this.event = event;
  }
}
