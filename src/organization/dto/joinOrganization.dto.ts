import { HttpStatus } from '@nestjs/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class JoinOrganizationInputDto {
  @Field(() => String)
  @IsUUID()
  organizationId: string;

  @Field(() => String)
  @IsUUID()
  userId: string;
}

@ObjectType()
export class JoinOrganizationOutputDto {
  @Field(() => String)
  message: string;

  @Field(() => Number)
  status: HttpStatus;
}
