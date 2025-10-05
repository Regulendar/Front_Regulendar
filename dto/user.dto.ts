import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  IsUUID,
} from 'class-validator';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class UserDto {
  @Field(() => String)
  @IsString()
  @IsUUID()
  id: string;

  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String, { nullable: true })
  @IsEmail()
  @IsString()
  email?: string;

  @Field(() => String, { nullable: true })
  @IsPhoneNumber('KR')
  @IsString()
  phone?: string;

  @Field(() => String)
  @IsString()
  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minNumbers: 0,
    minSymbols: 0,
  })
  password: string;
}
