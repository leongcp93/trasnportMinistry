import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Filter } from './filter.pipe';
@Injectable()

export class MembersService {
  name: Array<string> = [''];
  postcode: Array<string> = [''];
  i: number;
  members: Array<Object> = [];
  personToEdit: Object;
  abc: String = "efg";

  constructor(private httpClient: HttpClient, private pipe: Filter) {

  }

  getPassenger() {
    this.members = [];
    this.httpClient.get(`http://localhost:4300/api/member?passcode=pw1234&lg=uq6`)//change this when the legit url is there.
      .subscribe(
        (data: any[]) => {
          if (data.length) {
            for (this.i = 0; this.i < data.length; this.i++) {
              this.name[this.i] = data[this.i].name;
              this.postcode[this.i] = data[this.i].postcode;
              //this is where i group all the object into members
              this.members[this.i] = {
                name: this.name[this.i],
                postcode: this.postcode[this.i]
              }
              //this.space = data[0].space;
              //console.log(this.members[this.i]);
            }
          }
        }
      )
    return this.members;
  }

  filterPassengers(filter) {
    return this.pipe.transform(this.members, filter);
  }

  ngOnInit() {
    this.getPassenger();
  }
}
