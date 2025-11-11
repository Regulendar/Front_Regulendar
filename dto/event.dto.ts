import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsDate, IsNumber, IsString, IsUUID } from 'class-validator';

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
  @IsDate()
  eventStartAt: Date;

  @Field(() => Number)
  @IsNumber()
  eventDateYear: number;

  @Field(() => Number)
  @IsNumber()
  eventDateMonth: number;

  @Field(() => Number)
  @IsNumber()
  eventDateDay: number;

  @Field(() => Number)
  @IsNumber()
  eventDuration: number;

  @Field(() => [String])
  @IsString({ each: true })
  participationIds: string[];

  @Field(() => String)
  @IsUUID()
  hostOrganizationId: string;

  @Field(() => String)
  @IsUUID()
  hostUserId: string;
}
