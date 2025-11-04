import { HttpStatus } from '@nestjs/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class JoinEventInputDto {
  @Field(() => String)
  eventId: string;

  @Field(() => String)
  @IsUUID()
  userId: string;
}

@ObjectType()
export class JoinEventOutputDto {
  @Field(() => String)
  message: string;

  @Field(() => Number)
  status: HttpStatus;
}
