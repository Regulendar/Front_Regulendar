import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class EventDto {
  @Field(() => String)
  @IsString()
  eventId: string;

  @Field(() => String)
  @IsString()
  eventTitle: string;

  @Field(() => String)
  eventStartAt: string;

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
  hostOrganizationId: string;
}
