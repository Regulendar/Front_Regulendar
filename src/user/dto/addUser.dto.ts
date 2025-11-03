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
  @Field(() => Number)
  status: HttpStatus;

  @Field(() => String)
  message: string;
}
