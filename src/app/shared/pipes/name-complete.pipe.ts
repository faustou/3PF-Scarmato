import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameComplete'
})
export class NameCompletePipe implements PipeTransform {

  transform(name: string, lastName: string): string {
    return `${name} ${lastName}`;
  }

}
