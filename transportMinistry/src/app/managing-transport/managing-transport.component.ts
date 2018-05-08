import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscriber } from 'rxjs/Subscriber';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-managing-transport',
  templateUrl: './managing-transport.component.html',
  styleUrls: ['./managing-transport.component.scss']
})
export class ManagingTransportComponent implements OnInit {

  //driver: string = '';
  passengername: Array<string>=[''];
  transportForm: FormGroup;
  drivername: Array<string>=[''];
  i: number;

  constructor(private httpClient:HttpClient, private fb: FormBuilder) {

    

    


   }


   ngOnInit() {
     this.getDriver();
     this.getPassenger();
  }


   //getter for drivers data
   getDriver(){
    this.httpClient.get(`https://my-json-server.typicode.com/leongcp93/dummieDB/Passenger`)//change this when the legit url is there.
    .subscribe(
      (data:any[])=>{
        if (data.length) {
          for (this.i=0; this.i<data.length; this.i++){
            this.passengername[this.i] = data[this.i].name;
            console.log(this.passengername[this.i]+" in "+this.i+" as passenger");
          }
        }
      }
    )
   }
  

   //getter for passengers data
   getPassenger(){
    this.httpClient.get(`https://my-json-server.typicode.com/leongcp93/dummieDB/Drivers`)
    .subscribe(
      (data:any[])=>{
        if (data.length){
          for (this.i=0; this.i<data.length; this.i++){
            this.drivername[this.i] = data[this.i].name;
            console.log(this.drivername[this.i]+" in "+this.i+" as driver");
          }
        }
      }
    )
   }


  

}
