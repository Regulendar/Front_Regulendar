import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { EventDto } from 'dto';

@InputType()
export class GetEventInputDto {
  @Field(() => String)
  id: string;
}

@ObjectType()
export class GetEventOutputDto {
  @Field(() => EventDto)
  event: EventDto;
}
