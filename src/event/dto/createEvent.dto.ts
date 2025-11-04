import { HttpStatus } from '@nestjs/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateEventInputDto {
  @Field(() => String)
  eventTitle: string;

  @Field(() => String)
  eventStartAt: string;

  @Field(() => Number)
  eventDateYear: number;

  @Field(() => Number)
  @IsNumber()
  eventDateMonth: number;

  @Field(() => Number)
  @IsNumber()
  eventDateDay: number;

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
  @Field(() => Number)
  status: HttpStatus;

  @Field(() => String)
  message: string;
}
