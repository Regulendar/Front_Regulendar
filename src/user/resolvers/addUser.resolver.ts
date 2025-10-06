import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AddUserService } from '../services';
import { AddUserInputDto, AddUserOutputDto } from '../dto';

@Resolver()
export class AddUserResolver {
  constructor(private readonly addUserService: AddUserService) {}

  @Mutation(() => AddUserOutputDto)
  async addUser(@Args('input') input: AddUserInputDto) {
    return this.addUserService.execute(input);
  }
}
