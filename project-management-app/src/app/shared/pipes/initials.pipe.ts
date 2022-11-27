import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
})
export class InitialsPipe implements PipeTransform {
  transform(value: string): string {
    return value
      .split(' ')
      .map((el) => el.slice(0, 1).toUpperCase())
      .join('');
  }
}
