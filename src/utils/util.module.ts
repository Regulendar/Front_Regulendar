import { Global, Module } from '@nestjs/common';
import { ValidationUtil } from './validation.util';

@Global()
@Module({
  providers: [ValidationUtil],
  exports: [ValidationUtil],
})
export class UtilModule {}
