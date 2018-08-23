import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-participants',
  templateUrl: './list-participants.component.html',
  styleUrls: ['./list-participants.component.scss']
})
export class ListParticipantsComponent implements OnInit {

i: number;
driverNames: Array<string>=[''];
passengerNames: Array<string>=[''];
lg: string ='uq6';


  constructor(private httpClient:HttpClient) { }

  ngOnInit() {
    this.getDriver();
    this.getPassenger();
  }

  getDriver(){
    this.httpClient.get(`https://my-json-server.typicode.com/leongcp93/dummieDB/Members?space=1&&space=2&&space=3&&space=4&&space=5&&space=6&&space=7`)//change this when the legit url is there.
    .subscribe(
      (data:any[])=>{
        if (data.length) {
          for (this.i=0; this.i<data.length; this.i++){
            this.driverNames[this.i] = data[this.i].name;
            console.log("this is driver name"+this.driverNames[this.i]);
          }
        }
      })
    }

    getPassenger(){
      this.httpClient.get(`https://my-json-server.typicode.com/leongcp93/dummieDB/Members?space=0`)//change this when the legit url is there.
    .subscribe(
      (data:any[])=>{
        if (data.length) {
          for (this.i=0; this.i<data.length; this.i++){
            this.passengerNames[this.i] = data[this.i].name;
            console.log("this is passenger name"+this.passengerNames[this.i]);
          }
        }
      })
    }
  }
