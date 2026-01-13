import { EventStatus } from '@generated-prisma/enums';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEnum, IsNumber, IsUUID } from 'class-validator';
import { EventDto } from 'dto';

@InputType()
export class GetEventsInputDto {
  @Field(() => String, { nullable: true })
  @IsUUID()
  userId?: string;

  @Field(() => String, { nullable: true })
  @IsUUID()
  organizationId?: string;

  @Field(() => Number, { nullable: true })
  @IsNumber()
  eventDateYear?: number;

  @Field(() => Number, { nullable: true })
  @IsNumber()
  eventDateMonth?: number;

  @Field(() => Number, { nullable: true })
  @IsNumber()
  eventDateDay?: number;

  @Field(() => EventStatus, { nullable: true })
  @IsEnum(EventStatus)
  eventStatus?: EventStatus;
}

@ObjectType()
export class GetEventsOutputDto {
  @Field(() => [EventDto])
  events: EventDto[];
}
