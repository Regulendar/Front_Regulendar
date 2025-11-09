import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteUserInputDto, DeleteUserOutputDto } from '../dto';
import { PrismaService } from 'src/prisma';
import { ValidationUtil } from 'src/utils';

@Injectable()
export class DeleteUserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly validationUtil: ValidationUtil,
  ) {}

  async execute({ id }: DeleteUserInputDto): Promise<DeleteUserOutputDto> {
    try {
      const hasUser = await this.validationUtil.validateUser(id);
      if (!hasUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      await this.prismaService.user.delete({
        where: { id },
      });

      return {
        status: HttpStatus.OK,
        message: 'User deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Failed to delete user: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
