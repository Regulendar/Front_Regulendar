import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetEventService } from '../services';
import { GetEventInputDto, GetEventOutputDto } from '../dto';

@Resolver()
export class GetEventResolver {
  constructor(private readonly getEventService: GetEventService) {}

  @Query(() => GetEventOutputDto)
  async getEvent(
    @Args('input') input: GetEventInputDto,
  ): Promise<GetEventOutputDto> {
    return await this.getEventService.execute(input);
  }
}
