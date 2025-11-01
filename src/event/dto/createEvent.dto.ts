import { HttpStatus } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateEventOutputDto {
  @Field(() => Number)
  status: HttpStatus;

  @Field(() => String)
  message: string;
}
