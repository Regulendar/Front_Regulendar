import { HttpStatus } from '@nestjs/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class DeleteOrganizationInputDto {
  @Field(() => String)
  @IsUUID()
  id: string;
}

@ObjectType()
export class DeleteOrganizationOutputDto {
  @Field(() => String)
  message: string;

  @Field(() => Number)
  status: HttpStatus;
}
