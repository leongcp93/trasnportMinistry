import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MembersService } from '../members.service'

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})

export class EditPageComponent implements OnInit {

  name: string='';
  postcode: string='';
  editForm: FormGroup;
  member: Object;
  @ViewChild("postcode") inputPostcode: ElementRef;
  
  constructor(private fb: FormBuilder, private httpClient:HttpClient, private ms: MembersService) {
    this.editForm = fb.group ({
      'postcode':[null, Validators.compose([Validators.pattern('^[0-9]+$'), Validators.minLength(4), Validators.maxLength(4)])],
      'checkDriver': [null, Validators.required],
      'validate': ''
    })
   }

  ngOnInit() {
    this.member = this.ms.personToEdit;
  }

//this section havent finish yet for the editing
  onEdit(){
    this.postcode = this.inputPostcode.nativeElement.value; 

    this.httpClient.put(`http://localhost:4300/api/member?passcode=pw1234&lg=uq6`,{
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