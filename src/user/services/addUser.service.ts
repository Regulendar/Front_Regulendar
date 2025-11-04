import { HttpStatus, Injectable } from '@nestjs/common';
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
      return {
        status: HttpStatus.BAD_REQUEST,
        message: `Failed to create user: ${error.message}`,
      };
    }
  }
}
