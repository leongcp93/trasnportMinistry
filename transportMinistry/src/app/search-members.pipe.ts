import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchMembers'
})
export class SearchMembersPipe implements PipeTransform {

  transform(pipeData, pipeModifier): any {
    /*return pipeData.filter(eachItem => {
      console.log("modifier: " + pipeModifier);
      return ( 
        eachItem['name'].toLowerCase().includes(pipeModifier.toLowerCase())
      )
    });*/
    if (pipeData.length === 0 || pipeModifier === '') {
      return pipeData;
    }
    const resultArray = [];
    for (const item of pipeData) {
      if (item['name'].toLowerCase().includes(pipeModifier.toLowerCase())) {
        resultArray.push(item);
      }
    } 
    return resultArray;
  }
}


