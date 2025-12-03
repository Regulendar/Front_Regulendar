import { IEventType, IOrganizationType } from '.';

export type IUserType = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  password: string;
  event: IEventType[];
  organizations: IOrganizationType['id'][];
};
