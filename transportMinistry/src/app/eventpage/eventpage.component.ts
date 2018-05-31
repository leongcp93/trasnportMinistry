import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscriber } from 'rxjs/Subscriber';


@Component({
  selector: 'app-eventpage',
  templateUrl: './eventpage.component.html',
  styleUrls: ['./eventpage.component.scss']
})
export class EventpageComponent implements OnInit {

  fromLocation: string='';
  toLocation: string='';
  setTime: string='';
  eventForm: FormGroup;
  @ViewChild("tolocationInput") tolocationInput: ElementRef;
  @ViewChild("fromlocationInput") fromlocationInput: ElementRef;
  @ViewChild("settimeInput") settimeInput: ElementRef;
  



  constructor(private httpClient:HttpClient,private fb: FormBuilder) { 
    this.eventForm = fb.group ({
      'fromLocation':[null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
      'toLocation':[null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
      'setTime':[null, Validators.required],
      'validate': ''
    })
   }

  ngOnInit() {
  }

  

  postSignUp(event: any){

    this.toLocation=this.tolocationInput.nativeElement.value;
    this.fromLocation=this.fromlocationInput.nativeElement.value;
    this.setTime=this.settimeInput.nativeElement.value;

    this.httpClient.post(`https://my-json-server.typicode.com/leongcp93/dummieDB/Members`,{
      from: this.fromLocation,
      destination: this.toLocation,
      time:this.setTime

    })//change this when the legit url is there.
    .subscribe(
      (data:any[])=>{
        console.log(data);
          
        }
      
    )
  }

}

