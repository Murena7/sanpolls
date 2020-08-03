import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'error'
})
export class ErrorPipe implements PipeTransform {

  transform(value: any, errors: any): any {
    if (!value || !errors) {
      return null;
    }
    let error = null;
    Object.keys(errors).forEach(key => {
      if (value[key]) {
        error = value[key];
      }
    });
    return error;
  }

}
