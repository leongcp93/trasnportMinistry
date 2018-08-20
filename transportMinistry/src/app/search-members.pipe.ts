import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchMembers'
})
export class SearchMembersPipe implements PipeTransform {

  transform(pipeData, pipeModifier): any {
    return pipeData.filter(eachItem => {
      console.log("modifier: " + pipeModifier);
      return ( 
        eachItem['name'].toLowerCase().includes(pipeModifier.toLowerCase())
      )
    });
  }

}


