import { Global, Module } from '@nestjs/common';
import { ValidatorUtil } from './validator.util';
import { DateConverterUtil } from './dateConverter.util';

@Global()
@Module({
  providers: [ValidatorUtil, DateConverterUtil],
  exports: [ValidatorUtil, DateConverterUtil],
})
export class UtilModule {}
