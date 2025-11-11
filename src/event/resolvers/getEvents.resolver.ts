import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetEventsService } from '../services';
import { GetEventsInputDto, GetEventsOutputDto } from '../dto';

@Resolver()
export class GetEventsResolver {
  constructor(private readonly getEventsService: GetEventsService) {}

  @Query(() => GetEventsOutputDto)
  async getEvents(
    @Args('input') input: GetEventsInputDto,
  ): Promise<GetEventsOutputDto> {
    return await this.getEventsService.execute(input);
  }
}
