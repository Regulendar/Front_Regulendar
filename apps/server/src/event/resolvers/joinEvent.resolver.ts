import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JoinEventService } from '../services';
import { JoinEventInputDto, JoinEventOutputDto } from '../dto';

@Resolver()
export class JoinEventResolver {
  constructor(private readonly joinEventService: JoinEventService) {}

  @Mutation(() => JoinEventOutputDto)
  async joinEvent(
    @Args('input') input: JoinEventInputDto,
  ): Promise<JoinEventOutputDto> {
    return await this.joinEventService.execute(input);
  }
}
