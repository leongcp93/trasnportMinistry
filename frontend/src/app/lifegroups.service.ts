import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PeopleService } from './people.service';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class LifegroupsService {

  // personToEdit: Object;
  drivers: Array<object> = [];
  passengers: Array<object> = [];
  // selectedPassengers: object = {};
  // sortedPassengers: object = {};
  members: Array<object> = this.peopleService.members;
  adminLg: string;
  selected: Array<string> = [];
  unselected: Array<string> = [];
  ticked: Boolean = false;
  totalSeats: number = 0;
  loggedIn: Boolean = false;
  token: String = "";
  // header: HttpHeaders;
  notes: Array<string> = [];
  // email: string;
  // newPassword: string;

  constructor(private httpClient: HttpClient, private peopleService: PeopleService) { }

  getLifeGroup() {
    var units = [];
    this.httpClient.get('http://localhost:5000/api/lifegroup')
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

  getNotes() {
    this.httpClient.get('http://localhost:5000/api/notes?lg=' + this.adminLg)
    .subscribe(
      (data: any[]) => {
        this.notes = data;
      }
    )
    console.log(this.notes)
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
    this.token = "";
  }

}
