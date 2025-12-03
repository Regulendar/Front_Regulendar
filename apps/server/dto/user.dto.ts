import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';
import { EventParticipationDto, OrganizationMemberDto } from 'dto';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class UserDto {
  @Field(() => String)
  @IsUUID()
  id: string;

  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String, { nullable: true })
  profileImage?: string;

  @Field(() => [EventParticipationDto])
  eventParticipations: EventParticipationDto[];

  @Field(() => [OrganizationMemberDto])
  organizationMembers: OrganizationMemberDto[];
}
