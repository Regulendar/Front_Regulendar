import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetUserService } from '../services';
import { GetUserInputDto, GetUserOutputDto } from '../dto';

@Resolver()
export class GetUserResolver {
  constructor(private readonly getUserService: GetUserService) {}

  @Query(() => GetUserOutputDto)
  async getUser(@Args('input') input: GetUserInputDto) {
    return this.getUserService.execute(input);
  }
}
