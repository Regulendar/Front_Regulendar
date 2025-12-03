import { Field, Int, ObjectType, InputType } from '@nestjs/graphql';
import { IsNumber, IsUUID } from 'class-validator';
import { OrganizationDto } from 'dto';

@InputType()
export class GetOrganizationsInputDto {
  @Field(() => String)
  @IsUUID()
  userId: string;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  skip?: number;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  take?: number;
}

@ObjectType()
export class GetOrganizationsOutputDto {
  @Field(() => [OrganizationDto])
  organizations: OrganizationDto[];
}
