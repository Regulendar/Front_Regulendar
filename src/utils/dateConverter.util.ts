import { Injectable } from '@nestjs/common';

@Injectable()
export class DateConverterUtil {
  convertDateToDayParts(date: Date): {
    year: number;
    month: number;
    day: number;
  } {
    if (!date) {
      throw new Error('Date parameter is required');
    }
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    return { year, month, day };
  }
}
