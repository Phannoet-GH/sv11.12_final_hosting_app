import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cashKHR'
})
export class CashKhrPipe implements PipeTransform {
  transform(price: number, type: 'incash' | 'outcash'): string {
    if (!price || isNaN(price)) return 'Invalid';

    let result = 0;

    if (type === 'incash') {
      result = Math.ceil(price / 100) * 100;   // round UP to nearest 100
    } else if (type === 'outcash') {
      result = Math.floor(price / 100) * 100;  // round DOWN to nearest 100
    } else {
      result = price; // raw
    }

    return `${result.toLocaleString()} ៛`;
  }
}
