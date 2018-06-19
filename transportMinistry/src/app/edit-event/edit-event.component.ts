import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscriber } from 'rxjs/Subscriber';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {

  editForm:FormGroup;
  i: number;
  name: Array<string> = [''];

  constructor(private httpClient:HttpClient, private fb: FormBuilder) {

    this.editForm = fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
      'validate': ''
    });

   }

  ngOnInit() {
    this.getEvent();
  }

  getEvent(){
    this.httpClient.get(`http://www.transport.hope-church.com.au:4200/api/event?lg=uq6`)//change this when the legit url is there.
    .subscribe(
      (data:any[])=>{
        if (data.length) {
          for (this.i=0; this.i<data.length; this.i++){
            this.name[this.i] = data[this.i].name;
            console.log(this.name[this.i]);
          }
        }
      }
    )
  }

}
