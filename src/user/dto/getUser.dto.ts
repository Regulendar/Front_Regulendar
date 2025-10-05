import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { UserDto } from 'dto';

@InputType()
export class GetUserInputDto {
  @Field(() => String)
  @IsString()
  id: string;
}

@ObjectType()
export class GetUserOutputDto extends UserDto {}
