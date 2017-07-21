import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(list: any[], titleField: string,  keyword: string): any {
    if (!titleField || !keyword){
      return list;
    }

    return list.filter( item => {
      let fieldValue = item[titleField];
      return fieldValue.indexOf(keyword) >= 0
    })
  }

}
