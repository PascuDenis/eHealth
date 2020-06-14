export class Event {
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  color: string;

  constructor(
    title: string,
    startDate: string,
    endDate: string,
    description: string
  ) {
    this.title = title;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
    this.color = 'purple'
  }
}
