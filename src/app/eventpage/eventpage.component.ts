import { Component, OnInit } from '@angular/core';
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
  setTime: number;
  eventForm: FormGroup;


  constructor(private fb: FormBuilder) { 
    this.eventForm = fb.group ({
      'fromLocation':[null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
      'toLocation':[null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
      'setTime':[null, Validators.required],
      'validate': ''
    })
   }

  ngOnInit() {
  }

}
