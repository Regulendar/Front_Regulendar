import { IOrganizationType } from './organization.type';
import { IUserType } from './user.type';

export type IEventType = {
  id: string;
  eventTitle: string;
  eventStartAt: string;
  eventDateYear: number;
  eventDateMonth: number;
  eventDateDay: number;
  eventDuration: number;
  participationId: IUserType['id'][];
  hostOrganization: IOrganizationType;
};
