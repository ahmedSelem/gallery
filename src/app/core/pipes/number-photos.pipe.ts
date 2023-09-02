import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberPhotos',
  standalone: true,
})
export class NumberPhotosPipe implements PipeTransform {

  transform(list: any[]): number {
    return list.length;
  }

}
