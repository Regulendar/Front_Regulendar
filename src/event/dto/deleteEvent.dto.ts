import { HttpStatus } from '@nestjs/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class DeleteEventInputDto {
  @Field(() => String)
  eventId: string;
}

@ObjectType()
export class DeleteEventOutputDto {
  @Field(() => String)
  message: string;

  @Field(() => Number)
  status: HttpStatus;
}
