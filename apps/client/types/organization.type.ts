import { IEventType, IUserType } from '.';

export type IOrganizationType = {
  id: string;
  organizationName: string;
  organizationDescription: string;
  members: IUserType[];
  events: IEventType[];
};
