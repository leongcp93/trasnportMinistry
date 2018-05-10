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
  postcode: string='';
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
    this.getPassenger();
  }


  getPassenger(){
    this.httpClient.get(`https://my-json-server.typicode.com/leongcp93/dummieDB/Members?name=${this.name}`)//change this when the legit url is there.
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
