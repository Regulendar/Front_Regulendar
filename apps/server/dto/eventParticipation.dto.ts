import { EventRole } from '@generated-prisma/enums';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEnum, IsString } from 'class-validator';

registerEnumType(EventRole, {
  name: 'EventRole',
});

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class EventParticipationDto {
  @Field(() => String)
  @IsString()
  eventId: string;

  @Field(() => String)
  @IsString()
  userId: string;

  @Field(() => EventRole)
  @IsEnum(EventRole)
  role: EventRole;
}
