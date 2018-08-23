import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
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
  date: string='';
  lg: string='uq6'; //needed to read it globally
  description: string='';
  eventForm: FormGroup;
  isCreated: boolean = false;

  //refering IDs
  @ViewChild("topostcodeInput") topostcodeInput: ElementRef;
  @ViewChild("frompostcodeInput") frompostcodeInput: ElementRef;
  @ViewChild("settimeInput") settimeInput: ElementRef;
  @ViewChild("description") setdescription: ElementRef;
  @ViewChild("setdateInput") setdateInput: ElementRef;
  



  constructor(private httpClient:HttpClient,private fb: FormBuilder) { 
    this.eventForm = fb.group ({
      'fromPostcode':[null, Validators.compose([Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(4), Validators.maxLength(4)])],
      'toPostcode':[null, Validators.compose([Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(4), Validators.maxLength(4)])],
      'setTime':[null, Validators.required],
      'setDate':[null, Validators.required],
      'description':[null, Validators.required],
      'validate': ''
    })
   }

  ngOnInit() {
  }

  

  postEvent(event: any){

    this.postcode_to=this.topostcodeInput.nativeElement.value;
    this.postcode_from=this.frompostcodeInput.nativeElement.value;
    this.starting_Time=this.settimeInput.nativeElement.value;
    this.description=this.setdescription.nativeElement.value;
    this.date=this.setdateInput.nativeElement.value;

    this.httpClient.put(`http://www.transport.hope-church.com.au:4200/api/event`,{
      lg: this.lg,
      postcode_from: this.postcode_from,
      postcode_to: this.postcode_to,
      destination: this.description,
      starting_date: this.date,
      starting_time:this.starting_Time
      
    })//change this when the legit url is there.
    .subscribe(
      (data:any[])=>{
        console.log(data);
        this.isCreated = true;
          
        }
      
    )
  }

}

