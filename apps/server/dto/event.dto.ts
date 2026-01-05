import { EventStatus } from '@generated-prisma/enums';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsDate, IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
import { EventParticipationDto } from 'dto';

registerEnumType(EventStatus, {
  name: 'EventStatus',
});

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

  @Field(() => EventStatus)
  @IsEnum(EventStatus)
  eventStatus: EventStatus;

  @Field(() => String)
  @Field(() => [EventParticipationDto])
  eventParticipations: EventParticipationDto[];

  @Field(() => String)
  @IsUUID()
  hostOrganizationId: string;
}
