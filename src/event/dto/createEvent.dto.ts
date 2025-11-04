import { HttpStatus } from '@nestjs/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateEventInputDto {
  @Field(() => String)
  eventTitle: string;

  @Field(() => Date)
  eventStartAt: Date;

  @Field(() => Number)
  @IsNumber()
  eventDuration: number;

  @Field(() => String)
  @IsString()
  @IsUUID()
  hostOrganizationId: string;

  @Field(() => String)
  @IsString()
  @IsUUID()
  hostUserId: string;
}

@ObjectType()
export class CreateEventOutputDto {
  @Field(() => String)
  message: string;

  @Field(() => Number)
  status: HttpStatus;
}
