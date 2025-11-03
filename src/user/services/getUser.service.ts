import { PrismaService } from 'src/prisma';
import { GetUserInputDto, GetUserOutputDto } from '../dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class GetUserService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ id }: GetUserInputDto): Promise<GetUserOutputDto> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id,
        },
        include: {
          organizationMember: true,
        },
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (error) {
      throw new HttpException(
        `Failed to get user: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
