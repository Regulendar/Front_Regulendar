import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { AddUserInputDto, AddUserOutputDto } from '../dto';

@Injectable()
export class AddUserService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({
    name,
    profileImage,
  }: AddUserInputDto): Promise<AddUserOutputDto> {
    try {
      await this.prismaService.user.create({
        data: {
          name,
          profileImage,
          eventIds: [],
        },
      });

      return {
        status: HttpStatus.OK,
        message: 'User created successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Failed to create user: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
