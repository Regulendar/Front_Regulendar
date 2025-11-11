import { HttpStatus } from '@nestjs/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class AddUserInputDto {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String, { nullable: true })
  profileImage?: string;
}

@ObjectType()
export class AddUserOutputDto {
  @Field(() => String)
  message: string;

  @Field(() => Number)
  status: HttpStatus;
}
