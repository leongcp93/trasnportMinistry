import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {

    this.signupForm = fb.group({
      'name': [null, Validators.required],
      'lifegroup': [null, Validators.required],
      'validate': ''
    });

   }

  ngOnInit() {
  }

  addPost(post){
    this.name=post.name;
    this.lifegroup=post.lifegroup;
  }

}
