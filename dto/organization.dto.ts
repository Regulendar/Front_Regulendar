import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';
import { EventDto, OrganizationMemberDto } from 'dto';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class OrganizationDto {
  @Field(() => String)
  @IsUUID()
  organizationId: string;

  @Field(() => String)
  @IsString()
  organizationName: string;

  @Field(() => String, { nullable: true })
  @IsString()
  organizationDescription?: string;

  @Field(() => [EventDto])
  events: EventDto[];

  @Field(() => [OrganizationMemberDto])
  organizationMembers: OrganizationMemberDto[];
}
