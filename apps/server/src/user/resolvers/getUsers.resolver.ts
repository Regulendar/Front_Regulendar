import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetUsersInputDto, GetUsersOutputDto } from '../dto';
import { GetUsersService } from '../services';

@Resolver()
export class GetUsersResolver {
  constructor(private readonly getUsersService: GetUsersService) {}

  @Query(() => GetUsersOutputDto)
  async getUsers(
    @Args('input') input: GetUsersInputDto,
  ): Promise<GetUsersOutputDto> {
    return await this.getUsersService.execute(input);
  }
}
