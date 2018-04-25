import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscriber } from 'rxjs/Subscriber';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-managing-people',
  templateUrl: './managing-people.component.html',
  styleUrls: ['./managing-people.component.scss']
})
export class ManagingPeopleComponent implements OnInit {

  //declaring the variables
  name: string = '';
  postcode: number;
  found: boolean; 
  managingForm: FormGroup;
  post: any;


  constructor(private httpClient:HttpClient, private fb: FormBuilder) { 
//This is for validation on the name.
    this.managingForm = fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
      'validate': ''
    });

   }

 

//this is the event handeling
  onName(event:any){
    this.name = event.target.value;
    this.found=false;
  }

  getPassenger(){
    this.httpClient.get(`https://my-json-server.typicode.com/leongcp93/dummieDB/Passenger?name=${this.name}`)//change this when the legit url is there.
    .subscribe(
      (data:any[])=>{
        if (data.length) {
          this.name = data[0].name;
          this.postcode = data[0].postcode;
          this.found = true;
        }
      }
    )
  }

  ngOnInit() {
  }


  addPost(post){
    this.name = post.name;
  }
}
