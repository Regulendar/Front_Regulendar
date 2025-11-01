import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';

@Injectable()
export class CreateEventService {
  constructor(private readonly prismaService: PrismaService) {}

  async excute() {}
}
