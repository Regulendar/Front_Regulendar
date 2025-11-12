import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetOrganizationInputDto, GetOrganizationOutputDto } from '../dto';
import { GetOrganizationService } from '../services';

@Resolver()
export class GetOrganizationResolver {
  constructor(
    private readonly getOrganizationService: GetOrganizationService,
  ) {}

  @Query(() => GetOrganizationOutputDto)
  async getOrganization(
    @Args('input') input: GetOrganizationInputDto,
  ): Promise<GetOrganizationOutputDto> {
    return await this.getOrganizationService.execute(input);
  }
}
