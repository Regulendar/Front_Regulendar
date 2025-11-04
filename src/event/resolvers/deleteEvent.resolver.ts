import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { DeleteEventService } from '../services';
import { DeleteEventInputDto, DeleteEventOutputDto } from '../dto';

@Resolver()
export class DeleteEventResolver {
  constructor(private readonly deleteEventService: DeleteEventService) {}

  @Mutation(() => DeleteEventOutputDto)
  async deleteEvent(
    @Args('input') input: DeleteEventInputDto,
  ): Promise<DeleteEventOutputDto> {
    return this.deleteEventService.execute(input);
  }
}
