import { Query, Resolver } from '@nestjs/graphql';
import { TestService } from './test.service';

@Resolver()
export class TestResolver {
  constructor(private readonly testService: TestService) {}

  @Query(() => String)
  sayHello(): string {
    return this.testService.getHello();
  }
}
