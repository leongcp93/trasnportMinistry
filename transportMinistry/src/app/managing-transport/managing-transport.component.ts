import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DISABLED } from '@angular/forms/src/model';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-managing-transport',
  templateUrl: './managing-transport.component.html',
  styleUrls: ['./managing-transport.component.scss'],
  /*animations: [

    trigger('passengerVisibility',[

      state('true', style({
        opacity: '1'
      })),
      state('false', style({
        opacity: '0'
      })),

      transition('1 <=> 0', animate('200ms ease')),

    ]),

    trigger('passengerDisplay',[

      state('true', style({

        display: 'block'

      })),
      state('false', style({

        display: 'none'

      })),

      transition('0 => 1 ', animate('0ms ease')),
      transition('1 => 0', animate('0ms 200ms ease'))

    ])

  ]*/
})
export class ManagingTransportComponent implements OnInit {

  //driver: string = '';
  passengername: Array<string> = [];
  transportForm: FormGroup;
  drivername: Array<string> = [];
  selectedPassengers: object = {};
  i: number;
  checking: boolean = false;
  disable: boolean = true;
  passengerSpace: number = 0;
  visibility: boolean = true;
  display: boolean = true;

  constructor(private httpClient: HttpClient, private fb: FormBuilder) {

    this.transportForm = fb.group({
      'passengername': [null, Validators.required],
      'validate': ''
    });
  }

  ngOnInit() {
    this.getPeople();
  }

  //getter for drivers data
  getPeople() {
    this.httpClient.get(`http://localhost:4300/api/member?passcode=pw1234&lg=uq6&space=${this.passengerSpace}`)//change this when the legit url is there.
      .subscribe(
        (data: any[]) => {
          if (data.length) {
            for (this.i = 0; this.i < data.length; this.i++) {
              if (data[this.i].seats > 0) {
                this.drivername.push(data[this.i].name);
                this.selectedPassengers[data[this.i].name] = [];
              } else {
                this.passengername.push(data[this.i].name);
              }              
            }
          }
        }
      )
  }

  /*addPost(post){
    this.drivername = post.drivername;
    this.passengername = post.passengername;
  }*/

  //this function is used to check the selection
  /*selectionCheck(){
     this.checking = true;
     this.disable = false;
     console.log("disable value is "+this.disable+" and checking value is "+this.checking); 
  }*/

  animatePassenger(driver, passenger) {
    this.selectedPassengers[driver].push(passenger);
    const index = this.passengername.indexOf(passenger);
    this.passengername.splice(index, 1);
  }

  cancelAlloc(driver, passenger) {
    const index = this.selectedPassengers[driver].indexOf(passenger);
    this.selectedPassengers[driver].splice(index, 1);
    this.passengername.push(passenger);
  }

}
