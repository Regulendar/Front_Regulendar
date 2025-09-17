import { IEventType } from '@/types';

export const DUMMY_EVENTS: IEventType[] = [
  {
    id: '1',
    eventTitle: 'Meeting with Team',
    eventStartAt: '2025-09-30T10:00:00',
    eventDateYear: 2025,
    eventDateMonth: 9,
    eventDateDay: 30,
    eventDuration: 60,
  },
  {
    id: '2',
    eventTitle: 'Doctor Appointment',
    eventStartAt: '2025-09-30T15:00:00',
    eventDateYear: 2025,
    eventDateMonth: 9,
    eventDateDay: 20,
    eventDuration: 30,
  },
  {
    id: '3',
    eventTitle: 'Lunch with Sarah',
    eventStartAt: '2025-10-01T12:30:00',
    eventDateYear: 2025,
    eventDateMonth: 10,
    eventDateDay: 1,
    eventDuration: 90,
  },
  {
    id: '4',
    eventTitle: 'Project Deadline',
    eventStartAt: '2025-09-18T23:59:00',
    eventDateYear: 2025,
    eventDateMonth: 9,
    eventDateDay: 18,
    eventDuration: 0,
  },
];
