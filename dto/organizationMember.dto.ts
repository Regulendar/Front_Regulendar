import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { OrganizationRole } from '@prisma/client';

registerEnumType(OrganizationRole, {
  name: 'OrganizationRole',
});

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class OrganizationMemberDto {
  @Field(() => String)
  @IsString()
  @IsUUID()
  userId: string;

  @Field(() => String)
  @IsString()
  @IsUUID()
  organizationId: string;

  @Field(() => OrganizationRole)
  @IsEnum(OrganizationRole)
  role: OrganizationRole;
}
