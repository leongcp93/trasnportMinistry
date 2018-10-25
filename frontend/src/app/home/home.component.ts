import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders} from '@angular/common/http';
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
  group: string = '';
  dataId: string = '';
  units: Array<string> = [];
  loading: Boolean = false;

  @ViewChild("id") setId: ElementRef;
  @ViewChild("password") password: ElementRef;
  @ViewChild("lg") lg: ElementRef;

  constructor(private httpClient:HttpClient,private fb: FormBuilder, private ms: MembersService, private router: Router) {
    this.adminForm = fb.group({
      'password': [null, Validators.compose([Validators.required, 
        Validators.pattern('^[a-zA-Z0-9]+$')])],
      'lifegroup': [null, Validators.compose([Validators.required])],
      'validate' : ''
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.loading = true;
    this.ms.adminLg = this.lg.nativeElement.value.toLowerCase();
    this.ms.loggedIn = true;
    const password = this.password.nativeElement.value;
    this.httpClient.get("http://localhost:5000/api/login?lg="
    + this.ms.adminLg + "&password="+password)
    .subscribe(
      (data:any[])=>{
        this.loading = false;
        if (data['access_token'] == null) {
          alert(data['failure']);
          return;
        }
        this.ms.token = data['access_token'];
        this.ms.getPeople();
        this.ms.getNotes();
        this.router.navigate(['/managing-people'])
      }
    )
  }
}
