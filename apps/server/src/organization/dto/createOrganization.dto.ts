import { HttpStatus } from '@nestjs/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateOrganizationInputDto {
  @Field(() => String)
  @IsUUID()
  ownerUserId: string;

  @Field(() => String)
  @IsString()
  organizationName: string;

  @Field(() => String, { nullable: true })
  @IsString()
  organizationDescription?: string;
}

@ObjectType()
export class CreateOrganizationOutputDto {
  @Field(() => String)
  message: string;

  @Field(() => Number)
  status: HttpStatus;
}
