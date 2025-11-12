import { Args, Mutation, Resolver } from '@nestjs/graphql';

import {
  DeleteOrganizationInputDto,
  DeleteOrganizationOutputDto,
} from '../dto';
import { DeleteOrganizationService } from '../services';

@Resolver()
export class DeleteOrganizationResolver {
  constructor(
    private readonly deleteOrganizationService: DeleteOrganizationService,
  ) {}

  @Mutation(() => DeleteOrganizationOutputDto)
  async deleteOrganization(
    @Args('input') input: DeleteOrganizationInputDto,
  ): Promise<DeleteOrganizationOutputDto> {
    return await this.deleteOrganizationService.execute(input);
  }
}
