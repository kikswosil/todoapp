import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private prismaService: PrismaService) {}
}
