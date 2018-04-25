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

  constructor(private fb: FormBuilder) {

    this.signupForm = fb.group({
      'name': [null, Validators.required],
      'lifegroup': [null, Validators.required],
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
