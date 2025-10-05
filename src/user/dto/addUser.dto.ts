import { HttpStatus } from '@nestjs/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

@InputType()
export class AddUserInputDto {
  @Field(() => String)
  @IsString()
  id: string;

  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsEmail()
  email?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsPhoneNumber('KR')
  phone?: string;

  @Field(() => String)
  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minNumbers: 0,
    minSymbols: 0,
  })
  password: string;
}

@ObjectType()
export class AddUserOutputDto {
  @Field(() => Number)
  status: HttpStatus;

  @Field(() => String)
  message: string;
}
