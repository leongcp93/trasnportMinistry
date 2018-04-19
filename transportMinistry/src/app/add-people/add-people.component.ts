import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-people',
  templateUrl: './add-people.component.html',
  styleUrls: ['./add-people.component.scss']
})
export class AddPeopleComponent implements OnInit {

  addForm: FormGroup;
  post: any;
  name: string = ''; //for sample of validation refer https://www.youtube.com/watch?v=bo1Wu0aiigU 
  postcode: number;


  constructor(private fb: FormBuilder) {

    this.addForm =  fb.group({
      'name': [null, Validators.required],
      'postcode': [null, Validators.required],
      'validate' : ''
    });

   }

  ngOnInit() {
  }

  addPost(post){

    this.name = post.name;
    this.postcode = post.postcode;

  }

}
