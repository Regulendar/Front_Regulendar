import { Args, Mutation, Resolver } from '@nestjs/graphql';

import {
  CreateOrganizationInputDto,
  CreateOrganizationOutputDto,
} from '../dto';
import { CreateOrganizationService } from '../services';

@Resolver()
export class CreateOrganizationResolver {
  constructor(
    private readonly createOrganizationService: CreateOrganizationService,
  ) {}

  @Mutation(() => CreateOrganizationOutputDto)
  async createOrganization(
    @Args('input') input: CreateOrganizationInputDto,
  ): Promise<CreateOrganizationOutputDto> {
    return await this.createOrganizationService.execute(input);
  }
}
