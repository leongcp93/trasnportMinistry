import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {

  editForm:FormGroup;
  i: number;
  lg: string = 'uq6';
  passcode:string = 'pw1234';
  quaryName: string; //use to store the query string data

  //this section is used to indicate the found result of the search data
  resultname: Array<string> = ['']; 
  resultdate: Array<string> = ['']; 
  resultstartTime: Array<string> = [''];

  //this section holds the get value before the user search
  name: Array<string> = [''];
  date: Array<string> = [''];
  startTime: Array<string> = [''];
  events: Array<object> = [];

  //get element id data
  @ViewChild("eventName") eventNameInput: ElementRef;



  constructor(private httpClient:HttpClient, private fb: FormBuilder) {

    this.editForm = fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
      'validate': ''
    });

   }

  ngOnInit() {
    this.getEvent();
  }

  //get method for every existing data in the database
  getEvent(){
    this.httpClient.get('http://localhost:4300/api/event')//change this when the legit url is there.
    .subscribe(
      (data:any[])=>{
        if (data.length) {
          for (this.i=0; this.i<data.length; this.i++){
            this.name[this.i] = data[this.i].event;
            //this.date[this.i] = data[this.i].date;
            this.startTime[this.i] = data[this.i].time;

            this.events[this.i] = {
              name: this.name[this.i],
              //date: this.date[this.i],
              time: this.startTime[this.i]
            }
          }
        }
      }
    )
  }
}
