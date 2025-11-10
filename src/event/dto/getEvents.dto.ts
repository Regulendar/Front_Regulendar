import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
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
  eventDateYear?: number;

  @Field(() => Number, { nullable: true })
  eventDateMonth?: number;

  @Field(() => Number, { nullable: true })
  eventDateDay?: number;
}

@ObjectType()
export class GetEventsOutputDto {
  @Field(() => [EventDto])
  events: EventDto[];
}
