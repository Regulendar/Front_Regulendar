import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { UserDto } from './user.dto';

enum OrganizationRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class OrganizationMemberDto {
  @Field(() => String)
  @IsString()
  id: string;

  @Field(() => String)
  @IsString()
  @IsUUID()
  userId: string;

  @Field(() => UserDto)
  user: UserDto;

  @Field(() => String)
  @IsString()
  @IsUUID()
  organizationId: string;

  @Field(() => OrganizationRole)
  @IsEnum(OrganizationRole)
  role: OrganizationRole;
}
