import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscriber } from 'rxjs/Subscriber';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DISABLED } from '@angular/forms/src/model';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';

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
  passengername: Array<string>=[''];
  transportForm: FormGroup;
  drivername: Array<string>=[''];
  i: number;
  checking: boolean = false;
  disable: boolean = true;
  passengerSpace: number = 0;
  visibility: boolean = true;
  display: boolean = true;

  constructor(private httpClient:HttpClient, private fb: FormBuilder) {

    this.transportForm = fb.group({
      'passengername': [null, Validators.required],
      'validate': ''
    });
    
   }


   ngOnInit() {
     
     this.getDriver();
    this.getPassenger();
    
  }


   //getter for drivers data
   getDriver(){
    this.httpClient.get(`https://my-json-server.typicode.com/leongcp93/dummieDB/Members?space=${this.passengerSpace}`)//change this when the legit url is there.
    .subscribe(
      (data:any[])=>{
        if (data.length) {
          for (this.i=0; this.i<data.length; this.i++){
            this.passengername[this.i] = data[this.i].name;
            //console.log(this.passengername[this.i]+" in "+this.i+" as passenger");
          }
        }
      }
    )
   }
  

   //getter for passengers data
   getPassenger(){
    this.httpClient.get(`https://my-json-server.typicode.com/leongcp93/dummieDB/Members?space=1&&space=2&&space=3&&space=4&&space=5&&space=6&&space=7`)
    .subscribe(
      (data:any[])=>{
        if (data.length){
          for (this.i=0; this.i<data.length; this.i++){
            this.drivername[this.i] = data[this.i].name;
           // console.log(this.drivername[this.i]+" in "+this.i+" as driver");
          }
        }
      }
    )
   }

   addPost(post){
     this.drivername = post.drivername;
     this.passengername = post.passengername;
   }

   //this function is used to check the selection
   /*selectionCheck(){
      this.checking = true;
      this.disable = false;
      console.log("disable value is "+this.disable+" and checking value is "+this.checking); 
   }*/


   animatePassenger(){
     console.log("im work");
      this.visibility = (this.visibility=== true ? false: true);
   }
  

}
