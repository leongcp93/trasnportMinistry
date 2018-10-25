import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PeopleService } from './people.service';
import { LifegroupsService } from './lifegroups.service';
import { Filter } from './filter.pipe';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms'
@Injectable()

export class MembersService {
  personToEdit: Object;
  drivers: Array<object> = [];
  passengers: Array<object> = [];
  selectedPassengers: object = {};
  sortedPassengers: object = {};
  members: Array<object> = this.peopleService.members;
  adminLg: string;
  selected: Array<string> = [];
  unselected: Array<string> = [];
  ticked: Boolean = false;
  totalSeats: number = 0;
  loggedIn: Boolean = false;
  token: String = "";
  header: HttpHeaders;
  notes: Array<string> = [];
  email: string;
  newPassword: string;
  

  constructor(private httpClient: HttpClient, 
    private pipe: Filter, 
    public peopleService: PeopleService, 
    public lifegroupsService: LifegroupsService) {

  }

  getPeople(){
   return this.peopleService.getPeople();
  }


  filterPassengers(filter) {
    return this.pipe.transform(this.members, filter);
  }


  markMember(member){
    return this.peopleService.markMember(member);
  }
  
  ngOnInit() {
    this.getLifeGroup;
  }

  getLifeGroup(){
    return this.lifegroupsService.getLifeGroup();
  }

  getNotes(){
    return this.lifegroupsService.getNotes();
  }

  searchPostCode(suburb) {
    var suburbs = [];
    this.httpClient.get('http://localhost:5000/api/suburb?suburb='+suburb)
    .subscribe(
      (data: any[]) => {
        if (data.length > 10) {
          const arr = data.reverse().slice(0, 10);
          data = [];
          data = arr;
        }
        var i = 0;
        data.forEach((location)=>{
          suburbs.push(location.name + ", " + location.state.abbreviation + " " + location.postcode);
          i++;  
        })
      }
    )
    return suburbs;
  }

  logout(){
    return this.lifegroupsService.logout();
  }

  suburbValidator(): ValidatorFn {
    return (control: AbstractControl): { null: boolean } | ValidationErrors => {
      if (control.value == null) {
        return {'suburb': 'the suburb is empty'};
      }
      const index = control.value.indexOf(',');
      if (isNaN(parseInt(control.value.slice(-4))) || index == -1) {
        return { 'suburb': "the suburb is not in the incorrect format"};
      }
      if (control.value.slice(index+2, index+5) != "QLD") {
        return {'state': "incorrect state name"};
      }
      return null;
    };
  }


}

