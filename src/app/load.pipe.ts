import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'load'
})
export class LoadPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
