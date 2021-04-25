import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truckStatus'
})
export class TruckStatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
