import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JoinOrganizationService } from '../services';
import { JoinOrganizationInputDto, JoinOrganizationOutputDto } from '../dto';

@Resolver()
export class JoinOrganizationResolver {
  constructor(
    private readonly joinOrganizationService: JoinOrganizationService,
  ) {}

  @Mutation(() => JoinOrganizationOutputDto)
  async joinOrganization(
    @Args('input') input: JoinOrganizationInputDto,
  ): Promise<JoinOrganizationOutputDto> {
    return await this.joinOrganizationService.execute(input);
  }
}
