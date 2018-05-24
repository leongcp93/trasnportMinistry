import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscriber } from 'rxjs/Subscriber';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  post: any;
  lifegroup: string = '';
  name: string = '';
  errorMessage: string = '';
  postcode: number;
  isDriver: boolean;
  numberOfSeats: number;
  groupunit: string = '';

  constructor(private httpClient:HttpClient,private fb: FormBuilder) {

    this.signupForm = fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
      'lifegroup': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')])],
      'postcode': [null, Validators.compose([Validators.pattern('^[0-9]+$'), Validators.minLength(4), Validators.maxLength(4)])],
      //'isDriver': [null, Validators.required], // this is default validation for checking
      'numberOfSeats': [null, Validators.compose([Validators.pattern('^[0-9]+$'), Validators.min(1), Validators.max(7)])],
      'validate': ''
    });

   }

  ngOnInit() {
  }

  setName(event:any){
    this.name=event.target.value;
  }

  setPostcode(event:any){
    this.postcode=event.target.value;
  }

  postSignUp(){
    this.httpClient.post(`https://my-json-server.typicode.com/leongcp93/dummieDB/Members`,{
      name: this.name,
      postcode: this.postcode
    })//change this when the legit url is there.
    .subscribe(
      (data:any[])=>{
        console.log(data);
          
        }
      
    )
  }

 

}
