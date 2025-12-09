import { OrganizationRole } from '@generated-prisma/enums';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEnum, IsUUID } from 'class-validator';

registerEnumType(OrganizationRole, {
  name: 'OrganizationRole',
});

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class OrganizationMemberDto {
  @Field(() => String)
  @IsUUID()
  userId: string;

  @Field(() => String)
  @IsUUID()
  organizationId: string;

  @Field(() => OrganizationRole)
  @IsEnum(OrganizationRole)
  role: OrganizationRole;
}
