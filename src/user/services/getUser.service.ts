import { PrismaService } from 'src/prisma';
import { GetUserInputDto, GetUserOutputDto } from '../dto';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class GetUserService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ id }: GetUserInputDto): Promise<GetUserOutputDto> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    const hasNotUser = !user;
    if (hasNotUser) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }
}
