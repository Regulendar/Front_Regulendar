import { HttpStatus } from '@nestjs/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsDate, IsNumber, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateEventInputDto {
  @Field(() => String)
  @IsString()
  eventTitle: string;

  @Field(() => Date)
  @IsDate()
  eventStartAt: Date;

  @Field(() => Number)
  @IsNumber()
  eventDuration: number;

  @Field(() => String)
  @IsUUID()
  hostOrganizationId: string;

  @Field(() => String)
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
