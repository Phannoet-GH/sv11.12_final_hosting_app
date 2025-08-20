import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tokhr'
})
export class TokhrPipe implements PipeTransform {

  transform(price:number): unknown {
    let res:number = price*4100;
    let local_res:string = res.toLocaleString() +  ("៛");
    return local_res;
  }

}
