import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscriber } from 'rxjs/Subscriber';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  post: any;
  lifegroup: string = '';
  name: string = '';
  errorMessage: string = '';
  postcode: string = '';
  driver: boolean = false;
  numberOfSeats: number = 0;
  groupunit: string = '';

  //refer the id in html from the textfield.
  @ViewChild("nameInput") nameInput: ElementRef;
  @ViewChild("postcodeInput") postcodeInput: ElementRef;
  @ViewChild("seatsInput") seatsInput: ElementRef;

  //this section is to check drivers and passengers status
  @ViewChild("isDriver") isDriverInput: ElementRef;
  @ViewChild("isNotDriver") isNotDriverInput: ElementRef;

  constructor(private httpClient: HttpClient, private fb: FormBuilder) {

    this.signupForm = fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
      'lifegroup': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')])],
      'postcode': [null, Validators.compose([Validators.pattern('^[0-9]+$'), Validators.minLength(4), Validators.maxLength(4)])],
      'checkDriver': [false, Validators.required], // this is default validation for checking
      'numberOfSeats': [null, Validators.compose([Validators.pattern('^[0-9]+$'), Validators.min(1), Validators.max(7)])],
      'validate': ''
    });

  }

  ngOnInit() {
  }

  postSignUp() {
    //this part collect all the value in the field and set to httpClient. 
    this.name = this.nameInput.nativeElement.value;
    this.postcode = this.postcodeInput.nativeElement.value;
    this.numberOfSeats = this.seatsInput.nativeElement.value;

    //passing 
    this.httpClient.post(`https://my-json-server.typicode.com/leongcp93/dummieDB/Members`, {
      name: this.name,
      postcode: this.postcode,
      space: this.numberOfSeats
    })//change this when the legit url is there.
      .subscribe(
        (data: any[]) => {
          console.log(data);

        }
      )
  }

  //this function is to settle check driver
  checkDriver() {
    if (this.isDriverInput.nativeElement.checked) {
      this.driver = true;
      this.numberOfSeats = this.seatsInput.nativeElement.value;
    }
    if (this.isNotDriverInput.nativeElement.checked) {
      this.driver = false;
      this.numberOfSeats = 0;
    }
  }
}