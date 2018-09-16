import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '@angular/http';
import { MembersService } from '../members.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  adminForm: FormGroup;
  post: any;
  password: string = '';
  group: string = '';
  dataId: string = '';
  dataPassword: string ='';
  units: Array<string> = [];

  @ViewChild("id") setId: ElementRef;
  @ViewChild("password") setPassword: ElementRef;
  @ViewChild("lg") lg: ElementRef;

  constructor(private httpClient:HttpClient,private fb: FormBuilder, private ms: MembersService, public router: Router) {

    this.adminForm = fb.group({
     /* 'id': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')])],
      'password': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')])],*/
      'lifegroup': [null, Validators.compose([Validators.required])],
      'validate' : ''
    });

   }

  ngOnInit() {
    this.units = this.ms.getLifeGroup();
  }

  onSubmit() {
    this.ms.adminLg = this.lg.nativeElement.value.toLowerCase();
    this.ms.loggedIn = true;
    this.router.navigate(['/managing-people'])
  }

/*
  checkSignIn(){

    this.group = this.setId.nativeElement.value;
    this.password = this.setPassword.nativeElement.value;

    this.httpClient.get(`https://my-json-server.typicode.com/leongcp93/dummieDB/logins?ID=${this.group}&&password=${this.password}`)//change this when the legit url is there.
    .subscribe(
      (data:any[])=>{
        this.dataId = data[0].ID;
        this.dataPassword=data[0].password;

        if (this.group!=this.dataId || this.password!= this.dataPassword){
          console.log("Id or password is not correct.");
        } else if (this.group!=this.dataId && this.password!= this.dataPassword){
          console.log("Both id and password is correct");
        }

        console.log(data);
          
        }
      
    )
  }*/

}
