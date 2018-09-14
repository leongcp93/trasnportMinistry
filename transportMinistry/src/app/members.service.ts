import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Filter } from './filter.pipe';
@Injectable()

export class MembersService {
  personToEdit: Object;
  drivers: Array<object> = [];
  passengers: Array<object> = [];
  selectedPassengers: object = {};
  members: Array<object> = [];
  adminLg: string;
  selected: Array<string> = [];
  unselected: Array<string> = [];
  ticked: Boolean = false;
  totalSeats: number = 0;
  loggedIn: Boolean = false;

  constructor(private httpClient: HttpClient, private pipe: Filter) {

  }

  getPeople() {
    this.members = [];
    this.httpClient.get('http://localhost:4300/api/member?passcode=pw1234&lg=' + this.adminLg)//change this when the legit url is there.
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
      this.drivers.push(member);
      this.selectedPassengers[member.name] = [];
      this.totalSeats += member.seats;
    } else {
      this.passengers.push(member);
      this.unselected.push(member.name);
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
              units.push(data[i].name.toUpperCase());
            }
          }
        }
      )
    return units;
  }

  searchPostCode(suburb) {
    var suburbs = [];
    this.httpClient.get('http://v0.postcodeapi.com.au/suburbs.json?name='+suburb)
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

  logout() {
    this.members = [];
    this.passengers = [];
    this.drivers = [];
    this.selected = [];
    this.ticked = false;
    this.totalSeats = 0;
    this.unselected = [];
    this.loggedIn = false;
  }

}
