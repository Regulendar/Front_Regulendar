import { HttpStatus } from '@nestjs/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class DeleteOrganizationInputDto {
  @Field(() => String)
  @IsUUID()
  organizationId: string;

  @Field(() => String)
  @IsUUID()
  userId: string;

  @Field(() => String)
  @IsString()
  nameConfirmation: string;
}

@ObjectType()
export class DeleteOrganizationOutputDto {
  @Field(() => String)
  message: string;

  @Field(() => Number)
  status: HttpStatus;
}
