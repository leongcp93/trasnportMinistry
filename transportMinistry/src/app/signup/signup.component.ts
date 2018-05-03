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

  constructor(private fb: FormBuilder) {

    this.signupForm = fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
      'lifegroup': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')])],
      'postcode': [null, Validators.compose([Validators.pattern('^[0-9]+$'), Validators.minLength(4), Validators.maxLength(4)])],
      //'isDriver': [null, Validators.required], // this is default validation for checking
      'validate': ''
    });

   }

  ngOnInit() {
  }



  addPassenger(post){
    this.name=post.name;
    this.lifegroup=post.lifegroup;
    /*
    add more method to send.
    */
  }

}
