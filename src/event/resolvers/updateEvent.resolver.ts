import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UpdateEventInputDto, UpdateEventOutputDto } from '../dto';
import { UpdateEventService } from '../services';

@Resolver()
export class UpdateEventResolver {
  constructor(private readonly updateEventService: UpdateEventService) {}

  @Mutation(() => UpdateEventOutputDto)
  async updateEvent(
    @Args('input') input: UpdateEventInputDto,
  ): Promise<UpdateEventOutputDto> {
    return await this.updateEventService.updateEvent(input);
  }
}
