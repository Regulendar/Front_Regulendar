import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UnJoinEventService } from '../services';
import { UnJoinEventInputDto, UnJoinEventOutputDto } from '../dto';

@Resolver()
export class UnJoinEventResolver {
  constructor(private readonly unJoinEventService: UnJoinEventService) {}

  @Mutation(() => UnJoinEventOutputDto)
  async unJoinEvent(
    @Args('input') input: UnJoinEventInputDto,
  ): Promise<UnJoinEventOutputDto> {
    return await this.unJoinEventService.execute(input);
  }
}
