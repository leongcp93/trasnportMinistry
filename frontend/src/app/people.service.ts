import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  
  drivers: Array<object> = [];
  passengers: Array<object> = [];
  selectedPassengers: object = {};
  members: Array<object>= [];
  adminLg: string;
  unselected: Array<string> = [];
  totalSeats: number = 0;
  token: String = "";
  header: HttpHeaders;

  constructor(private httpClient: HttpClient) { 

  }

  getPeople() {
    if (this.members.length != 0) {
      this.members = [];
    }
    this.header = new HttpHeaders({
      "Authorization": "Bearer " + this.token
    })
    this.httpClient.get('http://localhost:5000/api/member?lg=' + this.adminLg, {
      headers: this.header
    })
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

}
