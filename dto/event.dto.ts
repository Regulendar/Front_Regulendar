import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class EventDto {
  @Field(() => String)
  @IsString()
  eventId: string;

  @Field(() => String)
  @IsString()
  eventTitle: string;

  @Field(() => Date)
  eventStartAt: Date;

  @Field(() => Number)
  eventDateYear: number;

  @Field(() => Number)
  eventDateMonth: number;

  @Field(() => Number)
  eventDateDay: number;

  @Field(() => Number)
  eventDuration: number;

  @Field(() => [String])
  @IsString({ each: true })
  participationId: string[];

  @Field(() => String)
  @IsString()
  @IsUUID()
  hostOrganizationId: string;

  @Field(() => String)
  @IsString()
  @IsUUID()
  hostUserId: string;
}
