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
  name: Array<string> = [''];
  postcode: Array<string> = [''];
  found: boolean; 
  resultname: string = '';
  resultpostcode: string = '';
  managingForm: FormGroup;
  post: any;
  space: number;
  i: number;
  dataMember: Array<string> = [''];
  currentPost: any;


  constructor(private httpClient:HttpClient, private fb: FormBuilder) { 
//This is for validation on the name.
    this.managingForm = fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
      'validate': ''
    });
    

   }

 

//this is the event handeling
  onName(event:any){
    this.resultname = event.target.value;
    this.found=false;
  }

  getPassenger(){
    this.httpClient.get(`https://my-json-server.typicode.com/leongcp93/dummieDB/Members`)//change this when the legit url is there.
    .subscribe(
      (data:any[])=>{
        if (data.length) {
          for (this.i=0; this.i<data.length; this.i++){
          this.name[this.i] = data[this.i].name;
          this.postcode[this.i] = data[this.i].postcode;
          //this.space = data[0].space;
          console.log(this.postcode);
           
          }
         
        }
      }
    )
  }

  getName(){
    this.httpClient.get(`https://my-json-server.typicode.com/leongcp93/dummieDB/Members?name=${this.resultname}`)//change this when the legit url is there.
    .subscribe(
      (data:any[])=>{
        if (data.length) {
          this.resultname = data[0].name;
          this.resultpostcode = data[0].postcode;
          this.space = data[0].space;
          this.found = true;
        }
      }
    )
  }

  ngOnInit() {
    this.getPassenger();
  }


  addPost(post){
    this.resultname = post.resultname;
  }
}
