import { Args, Query, Resolver } from '@nestjs/graphql';

import { GetOrganizationsService } from '../services/getOrganizations.service';
import { GetOrganizationsInputDto, GetOrganizationsOutputDto } from '../dto';

@Resolver()
export class GetOrganizationsResolver {
  constructor(
    private readonly getOrganizationsService: GetOrganizationsService,
  ) {}

  @Query(() => GetOrganizationsOutputDto)
  async getOrganizations(
    @Args('input') input: GetOrganizationsInputDto,
  ): Promise<GetOrganizationsOutputDto> {
    return this.getOrganizationsService.execute(input);
  }
}
