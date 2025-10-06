import { HttpStatus } from '@nestjs/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class DeleteUserInputDto {
  @Field(() => String)
  @IsString()
  @IsUUID()
  id: string;
}

@ObjectType()
export class DeleteUserOutputDto {
  @Field(() => Number)
  status: HttpStatus;

  @Field(() => String)
  message: string;
}
