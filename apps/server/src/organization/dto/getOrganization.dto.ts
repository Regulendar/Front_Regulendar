import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { OrganizationDto } from 'dto';

@InputType()
export class GetOrganizationInputDto {
  @Field(() => String)
  @IsUUID()
  organizationId: string;
}

@ObjectType()
export class GetOrganizationOutputDto {
  @Field(() => OrganizationDto)
  organization: OrganizationDto;
}
