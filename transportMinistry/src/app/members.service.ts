import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Filter } from './filter.pipe';
@Injectable()

export class MembersService {
  personToEdit: Object;
  drivers: Array<string> = [];
  passengers: Array<string> = [];
  selectedPassengers: object = {};
  members: Array<object> = [];
  constructor(private httpClient: HttpClient, private pipe: Filter) {

  }

  getPeople() {
    this.members = [];
    this.httpClient.get('http://localhost:4300/api/member?passcode=pw1234&lg=uq6')//change this when the legit url is there.
      .subscribe(
        (data: any[]) => {
          if (data.length) {
            for (var i = 0; i < data.length; i++) {
              this.members.push(data[i]);        
            }
          }
        }
      )
    return this.members;
  }

  filterPassengers(filter) {
    return this.pipe.transform(this.members, filter);
  }

  markMember(member) {
    if (member.seats > 0) {
      this.drivers.push(member.name);
      this.selectedPassengers[member.name] = [];
    } else {
      this.passengers.push(member.name);
    }
    const i = this.members.indexOf(member);
    this.members.splice(i, 1);
  }

  ngOnInit() {
    this.getPeople();
    this.getLifeGroup;
  }

  getLifeGroup() {
    var units = [];
    this.httpClient.get('http://localhost:4300/api/lifegroup?passcode=pw1234')
      .subscribe(
        (data: any[]) => {
          if (data.length) {
            for (var i = 0; i < data.length; i++) {
              units.push(data[i].name);
            }
          }
        }
      )
    return units;
  }

}
