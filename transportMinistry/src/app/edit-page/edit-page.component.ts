import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  name: string='';
  postcode: string='';
  editForm: FormGroup;
  post: any;
  updatedName: string='';
  updatedPostcode: string='';


  constructor(private fb: FormBuilder, private httpClient:HttpClient) {
    this.editForm = fb.group ({
      'name':[null, Validators.pattern('^[a-zA-Z]+$')],
      'postcode':[null, Validators.compose([Validators.pattern('^[0-9]+$'), Validators.minLength(4), Validators.maxLength(4)])],
      'validate': ''
    })
   }

  ngOnInit() {
    this.getPassenger();
  }

//this section havent finish yet for the editing
  onEdit(){
    this.name = this.updatedName;
    this.postcode = this.updatedPostcode; 

    this.httpClient.post(`http://localhost:4300/api/member?passcode=pw1234&lg=uq6`,{
      name: this.name,
      postcode: this.postcode
    })
    
  }

//retreiving their information by calling API
  getPassenger(){
    this.httpClient.get(`http://localhost:4300/api/member?passcode=pw1234&name=${this.name}&lg=uq6`)//change this when the legit url is there.
    .subscribe(
      (data:any[])=>{
        if (data.length) {
            this.name = data[0].name;
            this.postcode = data[0].postcode;
            console.log("got information of "+this.name+" and "+this.postcode);
        }
      }
    )
   }

}
