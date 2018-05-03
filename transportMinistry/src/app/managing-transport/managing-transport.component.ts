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

  driver: string = '';
  passengername: string='';
  transportForm: FormGroup;

  constructor(private httpClient:HttpClient, private fb: FormBuilder) {



   }

   //getter for drivers data
   getDriver(){
     this.httpClient.get(`https://my-json-server.typicode.com/leongcp93/dummieDB/Drivers/${this.driver}`)
    .subscribe(
      (data:any[])=>{
        if (data.length){
          this.driver = data[0].Drivers;
         
        }
      }
    )
   }
  
   //getter for passengers data
   getPassenger(){
    this.httpClient.get(`https://my-json-server.typicode.com/leongcp93/dummieDB/Passenger/${this.passengername}`)//change this when the legit url is there.
    .subscribe(
      (data:any[])=>{
        if (data.length) {
          this.passengername = data[0].Passenger;
          
        }
      }
    )
   }


  ngOnInit() {
  }

}
