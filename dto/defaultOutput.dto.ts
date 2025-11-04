import { HttpStatus } from '@nestjs/common';
import { Field, registerEnumType } from '@nestjs/graphql';

registerEnumType(HttpStatus, {
  name: 'HttpStatus',
});

export class DefaultOutputDto {
  @Field(() => String)
  message: string;

  @Field(() => HttpStatus)
  status: HttpStatus;
}
