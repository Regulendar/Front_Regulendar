import { HttpStatus } from '@nestjs/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsDate, IsString } from 'class-validator';

@InputType()
export class UpdateEventInputDto {
  @Field(() => String)
  @IsString()
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

@ObjectType()
export class UpdateEventOutputDto {
  @Field(() => String)
  message: string;

  @Field(() => Number)
  status: HttpStatus;
}
