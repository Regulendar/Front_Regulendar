import { IEventType } from './event.type';
import { IUserType } from './user.type';

export type IOrganizationType = {
  id: string;
  organizationName: string;
  organizationDescription: string;
  members: IUserType[];
  events: IEventType[];
};
