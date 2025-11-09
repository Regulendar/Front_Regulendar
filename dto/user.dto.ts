import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';
import { OrganizationMemberDto } from './organizationMember.dto';

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
  profileImage?: string;

  @Field(() => [String])
  @IsString({ each: true })
  eventIds: string[];

  @Field(() => [OrganizationMemberDto])
  organizationMembers: OrganizationMemberDto[];
}
