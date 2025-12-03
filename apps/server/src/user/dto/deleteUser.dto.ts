import { HttpStatus } from '@nestjs/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class DeleteUserInputDto {
  @Field(() => String)
  @IsUUID()
  id: string;
}

@ObjectType()
export class DeleteUserOutputDto {
  @Field(() => String)
  message: string;

  @Field(() => Number)
  status: HttpStatus;
}
