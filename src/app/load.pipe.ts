import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'load'
})
export class LoadPipe implements PipeTransform {

  transform(value: any, type: string): any {
    let res;
    if (type === 'ACTIVE'){
      res = value.filter(load => {
        if ( load.status !== 'SHIPPED'){
          return load;
        }
      });
    }
    if (type === 'HISTORY'){
      res = value.filter(load => {
        if ( load.status === 'SHIPPED'){
          return load;
        }
      });
    }
    return res;
  }

}
