import { Args, Mutation, Resolver } from '@nestjs/graphql';

import {
  UnJoinOrganizationInputDto,
  UnJoinOrganizationOutputDto,
} from '../dto';
import { UnJoinOrganizationService } from '../services';

@Resolver()
export class UnJoinOrganizationResolver {
  constructor(
    private readonly unJoinOrganizationService: UnJoinOrganizationService,
  ) {}

  @Mutation(() => UnJoinOrganizationOutputDto)
  async unJoinOrganization(
    @Args('input') input: UnJoinOrganizationInputDto,
  ): Promise<UnJoinOrganizationOutputDto> {
    return await this.unJoinOrganizationService.execute(input);
  }
}
