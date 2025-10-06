import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteUserInputDto, DeleteUserOutputDto } from '../dto';
import { PrismaService } from 'src/prisma';

@Injectable()
export class DeleteUserService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ id }: DeleteUserInputDto): Promise<DeleteUserOutputDto> {
    try {
      await this.prismaService.user.delete({
        where: { id },
      });
      return {
        status: HttpStatus.OK,
        message: 'User deleted successfully',
      };
    } catch (error) {
      throw new HttpException(`User not found: ${error}`, HttpStatus.NOT_FOUND);
    }
  }
}
