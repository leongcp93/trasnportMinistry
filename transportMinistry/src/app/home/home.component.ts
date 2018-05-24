import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  group: string = '';

  constructor(private httpClient:HttpClient,private fb: FormBuilder) {

    this.adminForm = fb.group({
      'id': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')])],
      'password': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')])],
      'validate' : ''
    });

   }

  ngOnInit() {
  }

  setId(event: any){
    this.id=event.target.value;
  }

  setPassword(event: any){
    this.password=event.target.value;
  }


  checkSignIn(){
    this.httpClient.get(`https://my-json-server.typicode.com/leongcp93/dummieDB/logins?ID=${this.id}&&password=${this.password}`)//change this when the legit url is there.
    .subscribe(
      (data:any[])=>{
        this.group=data[0].ID;
        console.log(data);
          
        }
      
    )
  }

}
