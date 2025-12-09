import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AddUserInputDto = {
  name: Scalars['String']['input'];
  profileImage?: InputMaybe<Scalars['String']['input']>;
};

export type AddUserOutputDto = {
  __typename?: 'AddUserOutputDto';
  message: Scalars['String']['output'];
  status: Scalars['Float']['output'];
};

export type CreateEventInputDto = {
  eventDuration: Scalars['Float']['input'];
  eventStartAt: Scalars['DateTime']['input'];
  eventTitle: Scalars['String']['input'];
  hostOrganizationId: Scalars['String']['input'];
  hostUserId: Scalars['String']['input'];
};

export type CreateEventOutputDto = {
  __typename?: 'CreateEventOutputDto';
  message: Scalars['String']['output'];
  status: Scalars['Float']['output'];
};

export type CreateOrganizationInputDto = {
  organizationDescription?: InputMaybe<Scalars['String']['input']>;
  organizationName: Scalars['String']['input'];
  ownerUserId: Scalars['String']['input'];
};

export type CreateOrganizationOutputDto = {
  __typename?: 'CreateOrganizationOutputDto';
  message: Scalars['String']['output'];
  status: Scalars['Float']['output'];
};

export type DeleteEventInputDto = {
  eventId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type DeleteEventOutputDto = {
  __typename?: 'DeleteEventOutputDto';
  message: Scalars['String']['output'];
  status: Scalars['Float']['output'];
};

export type DeleteOrganizationInputDto = {
  nameConfirmation: Scalars['String']['input'];
  organizationId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type DeleteOrganizationOutputDto = {
  __typename?: 'DeleteOrganizationOutputDto';
  message: Scalars['String']['output'];
  status: Scalars['Float']['output'];
};

export type DeleteUserInputDto = {
  id: Scalars['String']['input'];
};

export type DeleteUserOutputDto = {
  __typename?: 'DeleteUserOutputDto';
  message: Scalars['String']['output'];
  status: Scalars['Float']['output'];
};

export type EventDto = {
  __typename?: 'EventDto';
  eventDateDay: Scalars['Float']['output'];
  eventDateMonth: Scalars['Float']['output'];
  eventDateYear: Scalars['Float']['output'];
  eventDuration: Scalars['Float']['output'];
  eventId: Scalars['String']['output'];
  eventParticipations: Array<EventParticipationDto>;
  eventStartAt: Scalars['DateTime']['output'];
  eventTitle: Scalars['String']['output'];
  hostOrganizationId: Scalars['String']['output'];
};

export type EventParticipationDto = {
  __typename?: 'EventParticipationDto';
  eventId: Scalars['String']['output'];
  role: EventRole;
  userId: Scalars['String']['output'];
};

export enum EventRole {
  Host = 'HOST',
  Participant = 'PARTICIPANT'
}

export type GetEventInputDto = {
  eventId: Scalars['String']['input'];
};

export type GetEventOutputDto = {
  __typename?: 'GetEventOutputDto';
  event: EventDto;
};

export type GetEventsInputDto = {
  eventDateDay?: InputMaybe<Scalars['Float']['input']>;
  eventDateMonth?: InputMaybe<Scalars['Float']['input']>;
  eventDateYear?: InputMaybe<Scalars['Float']['input']>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type GetEventsOutputDto = {
  __typename?: 'GetEventsOutputDto';
  events: Array<EventDto>;
};

export type GetOrganizationInputDto = {
  organizationId: Scalars['String']['input'];
};

export type GetOrganizationOutputDto = {
  __typename?: 'GetOrganizationOutputDto';
  organization: OrganizationDto;
};

export type GetOrganizationsInputDto = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['String']['input'];
};

export type GetOrganizationsOutputDto = {
  __typename?: 'GetOrganizationsOutputDto';
  organizations: Array<OrganizationDto>;
};

export type GetUserInputDto = {
  id: Scalars['String']['input'];
};

export type GetUserOutputDto = {
  __typename?: 'GetUserOutputDto';
  user: UserDto;
};

export type GetUsersInputDto = {
  eventId?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  userIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type GetUsersOutputDto = {
  __typename?: 'GetUsersOutputDto';
  users: Array<UserDto>;
};

export type JoinEventInputDto = {
  eventId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type JoinEventOutputDto = {
  __typename?: 'JoinEventOutputDto';
  message: Scalars['String']['output'];
  status: Scalars['Float']['output'];
};

export type JoinOrganizationInputDto = {
  organizationId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type JoinOrganizationOutputDto = {
  __typename?: 'JoinOrganizationOutputDto';
  message: Scalars['String']['output'];
  status: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUser: AddUserOutputDto;
  createEvent: CreateEventOutputDto;
  createOrganization: CreateOrganizationOutputDto;
  deleteEvent: DeleteEventOutputDto;
  deleteOrganization: DeleteOrganizationOutputDto;
  deleteUser: DeleteUserOutputDto;
  joinEvent: JoinEventOutputDto;
  joinOrganization: JoinOrganizationOutputDto;
  unJoinEvent: UnJoinEventOutputDto;
  unJoinOrganization: UnJoinOrganizationOutputDto;
  updateEvent: UpdateEventOutputDto;
};


export type MutationAddUserArgs = {
  input: AddUserInputDto;
};


export type MutationCreateEventArgs = {
  input: CreateEventInputDto;
};


export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInputDto;
};


export type MutationDeleteEventArgs = {
  input: DeleteEventInputDto;
};


export type MutationDeleteOrganizationArgs = {
  input: DeleteOrganizationInputDto;
};


export type MutationDeleteUserArgs = {
  input: DeleteUserInputDto;
};


export type MutationJoinEventArgs = {
  input: JoinEventInputDto;
};


export type MutationJoinOrganizationArgs = {
  input: JoinOrganizationInputDto;
};


export type MutationUnJoinEventArgs = {
  input: UnJoinEventInputDto;
};


export type MutationUnJoinOrganizationArgs = {
  input: UnJoinOrganizationInputDto;
};


export type MutationUpdateEventArgs = {
  input: UpdateEventInputDto;
};

export type OrganizationDto = {
  __typename?: 'OrganizationDto';
  events: Array<EventDto>;
  organizationDescription?: Maybe<Scalars['String']['output']>;
  organizationId: Scalars['String']['output'];
  organizationMembers: Array<OrganizationMemberDto>;
  organizationName: Scalars['String']['output'];
};

export type OrganizationMemberDto = {
  __typename?: 'OrganizationMemberDto';
  organizationId: Scalars['String']['output'];
  role: OrganizationRole;
  userId: Scalars['String']['output'];
};

export enum OrganizationRole {
  Admin = 'ADMIN',
  Member = 'MEMBER',
  Owner = 'OWNER'
}

export type Query = {
  __typename?: 'Query';
  getEvent: GetEventOutputDto;
  getEvents: GetEventsOutputDto;
  getOrganization: GetOrganizationOutputDto;
  getOrganizations: GetOrganizationsOutputDto;
  getUser: GetUserOutputDto;
  getUsers: GetUsersOutputDto;
};


export type QueryGetEventArgs = {
  input: GetEventInputDto;
};


export type QueryGetEventsArgs = {
  input: GetEventsInputDto;
};


export type QueryGetOrganizationArgs = {
  input: GetOrganizationInputDto;
};


export type QueryGetOrganizationsArgs = {
  input: GetOrganizationsInputDto;
};


export type QueryGetUserArgs = {
  input: GetUserInputDto;
};


export type QueryGetUsersArgs = {
  input: GetUsersInputDto;
};

export type UnJoinEventInputDto = {
  eventId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type UnJoinEventOutputDto = {
  __typename?: 'UnJoinEventOutputDto';
  message: Scalars['String']['output'];
  status: Scalars['Float']['output'];
};

export type UnJoinOrganizationInputDto = {
  organizationId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type UnJoinOrganizationOutputDto = {
  __typename?: 'UnJoinOrganizationOutputDto';
  message: Scalars['String']['output'];
  status: Scalars['Float']['output'];
};

export type UpdateEventInputDto = {
  eventDuration?: InputMaybe<Scalars['Float']['input']>;
  eventId: Scalars['String']['input'];
  eventStartAt?: InputMaybe<Scalars['DateTime']['input']>;
  eventTitle?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateEventOutputDto = {
  __typename?: 'UpdateEventOutputDto';
  message: Scalars['String']['output'];
  status: Scalars['Float']['output'];
};

export type UserDto = {
  __typename?: 'UserDto';
  eventParticipations: Array<EventParticipationDto>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  organizationMembers: Array<OrganizationMemberDto>;
  profileImage?: Maybe<Scalars['String']['output']>;
};
