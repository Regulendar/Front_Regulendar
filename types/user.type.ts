import { IEventType } from './event.type';
import { IOrganizationType } from './organization.type';

export type IUserType = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  password: string;
  event: IEventType[];
  organization: IOrganizationType[];
};
