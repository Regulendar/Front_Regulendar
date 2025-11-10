import { Global, Module } from '@nestjs/common';
import { ValidatorUtil } from './validator.util';

@Global()
@Module({
  providers: [ValidatorUtil],
  exports: [ValidatorUtil],
})
export class UtilModule {}
