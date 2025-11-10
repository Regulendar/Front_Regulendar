import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateEventService } from '../services';
import { CreateEventInputDto, CreateEventOutputDto } from '../dto';

@Resolver()
export class CreateEventResolver {
  constructor(private readonly createEventService: CreateEventService) {}

  @Mutation(() => CreateEventOutputDto)
  async createEvent(
    @Args('input') input: CreateEventInputDto,
  ): Promise<CreateEventOutputDto> {
    return await this.createEventService.execute(input);
  }
}
