import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';
import { UserDto } from 'dto';

@InputType()
export class GetUsersInputDto {
  @Field(() => String, { nullable: true })
  @IsUUID()
  organizationId?: string;

  @Field(() => [String], { nullable: true })
  @IsString({ each: true })
  userIds?: string[];

  @Field(() => String, { nullable: true })
  eventId?: string;
}

@ObjectType()
export class GetUsersOutputDto {
  @Field(() => [UserDto])
  users: UserDto[];
}
