import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '@angular/http';
import { MembersService } from '../members.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.scss']
})
export class AdminSignupComponent implements OnInit {
  adminForm: FormGroup;
  @ViewChild("lg") lifegroup: ElementRef;
  @ViewChild("password") password: ElementRef;
  @ViewChild("email") email: ElementRef;

  constructor(private httpClient:HttpClient,private fb: FormBuilder, private ms: MembersService, private router: Router) { 
    this.adminForm = fb.group({
      'password': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')])],
      'lifegroup': [null, Validators.required],
      'email': [null, Validators.required],
      'validate' : ''
    });
  }

  ngOnInit() {
  
  }

  onSubmit() {
    const url = "http://localhost:5000/api/lifegroup";
    this.httpClient.post(url, {
      "lg": this.lifegroup.nativeElement.value,
      "email": this.email.nativeElement.value,
      "password": this.password.nativeElement.value
    }).subscribe((data: any)=>{
      console.log(data);
    })
    this.router.navigate(['/admin-signup-respond']);
  }

}
