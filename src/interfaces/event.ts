export interface IEvent {
  id?: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  typeId: 1 | 2;
}

export interface IEventByWeek {
  weekNumber: number;
  startWeek: Date;
  endWeek: Date;
  eventCount: number;
}

