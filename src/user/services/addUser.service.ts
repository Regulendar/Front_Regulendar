import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { AddUserInputDto, AddUserOutputDto } from '../dto';

@Injectable()
export class AddUserService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({
    id,
    name,
    email,
    phone,
    password,
  }: AddUserInputDto): Promise<AddUserOutputDto> {
    const hasNotUserData = !email && !phone;

    if (hasNotUserData) {
      throw new HttpException(
        'Email or phone number is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prismaService.user.create({
      data: {
        id,
        name,
        email,
        phoneNumber: phone,
        password,
      },
    });

    return {
      status: HttpStatus.OK,
      message: 'User created successfully',
    };
  }
}
