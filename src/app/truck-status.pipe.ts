import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truckStatus'
})
export class TruckStatusPipe implements PipeTransform {

  transform(value: string): string {
    switch (value){
      case 'IS' : return 'In Service';
      case 'OS' : return 'Out of Service';
      case 'OL' : return 'On Load';
    }
    return null;
  }

}
