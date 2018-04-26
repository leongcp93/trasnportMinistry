import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscriber } from 'rxjs/Subscriber';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  name: string='';
  postcode: number;
  editForm: FormGroup;
  post: any;


  constructor(private fb: FormBuilder, private httpClient:HttpClient) {
    this.editForm = fb.group ({
      'name':[null, Validators.pattern('^[a-zA-Z]+$')],
      'postcode':[null, Validators.compose([Validators.pattern('^[0-9]+$'), Validators.minLength(4), Validators.maxLength(4)])],
      'validate': ''
    })
   }

  ngOnInit() {
  }

}
