import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsUUID } from 'class-validator';
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
}

@ObjectType()
export class GetEventsOutputDto {
  @Field(() => [EventDto])
  events: EventDto[];
}
