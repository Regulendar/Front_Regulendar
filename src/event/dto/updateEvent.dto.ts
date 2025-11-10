import { HttpStatus } from '@nestjs/common';
import { Field } from '@nestjs/graphql';
import { IsDate, IsString } from 'class-validator';

export class UpdateEventInputDto {
  @Field(() => String)
  eventId: string;

  @Field(() => String, { nullable: true })
  @IsString()
  eventTitle?: string;

  @Field(() => Date, { nullable: true })
  @IsDate()
  eventStartAt?: Date;

  @Field(() => Number, { nullable: true })
  eventDuration?: number;
}

export class UpdateEventOutputDto {
  @Field(() => String)
  message: string;

  @Field(() => Number)
  status: HttpStatus;
}
