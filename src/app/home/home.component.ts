import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  adminForm: FormGroup;
  post: any;
  id: string = '';
  password: string = '';

  constructor(private fb: FormBuilder) {

    this.adminForm = fb.group({
      'id': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')])],
      'password': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')])],
      'validate' : ''
    });

   }

  ngOnInit() {
  }

  addPost(post){
    this.id = post.id;
    this.password = post.password;
  }

}
