import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscriber } from 'rxjs/Subscriber';
import { Response } from '@angular/http';

@Component({
  selector: 'app-eventpage',
  templateUrl: './eventpage.component.html',
  styleUrls: ['./eventpage.component.scss']
})
export class EventpageComponent implements OnInit {

  postcode_from: string='';
  postcode_to: string='';
  starting_Time: string='';
  lg: string='uq6';
  eventForm: FormGroup;
  isCreated: boolean = false;
  @ViewChild("topostcodeInput") topostcodeInput: ElementRef;
  @ViewChild("frompostcodeInput") frompostcodeInput: ElementRef;
  @ViewChild("settimeInput") settimeInput: ElementRef;
  



  constructor(private httpClient:HttpClient,private fb: FormBuilder) { 
    this.eventForm = fb.group ({
      'fromPostcode':[null, Validators.compose([Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(4), Validators.maxLength(4)])],
      'toPostcode':[null, Validators.compose([Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(4), Validators.maxLength(4)])],
      'setTime':[null, Validators.required],
      'validate': ''
    })
   }

  ngOnInit() {
  }

  

  postSignUp(event: any){

    this.postcode_to=this.topostcodeInput.nativeElement.value;
    this.postcode_from=this.frompostcodeInput.nativeElement.value;
    this.starting_Time=this.settimeInput.nativeElement.value;

    this.httpClient.put(`http://www.transport.hope-church.com.au:4200/api/event`,{
      lifegroup: this.lg,
      from: this.postcode_from,
      destination: this.postcode_to,
      time:this.starting_Time
      

    })//change this when the legit url is there.
    .subscribe(
      (data:any[])=>{
        console.log(data);
        this.isCreated = true;
          
        }
      
    )
  }

}

