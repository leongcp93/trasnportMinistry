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

    //These are the validation condition
    this.addForm =  fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
      'postcode': [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(4), Validators.maxLength(4) ])],
      'validate' : ''
    });

   }

  ngOnInit() {
  }


  //post method for the retrieved result
  addPost(post){

    this.name = post.name;
    this.postcode = post.postcode;

  }

}
