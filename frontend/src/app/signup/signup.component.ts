import { Component, OnInit, ViewChild, ElementRef, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { MembersService } from '../members.service'
import { forEach } from '@angular/router/src/utils/collection';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  driver: boolean = false;
  numberOfSeats: number = 0;
  units: Array<string> = [];
  suburbs: Array<string> = [];

  //refer the id in html from the textfield.
  @ViewChild("firstName") firstName: ElementRef;
  @ViewChild("lastName") lastName: ElementRef;
  @ViewChild("suburbInput") suburbInput: ElementRef;
  @ViewChild("seatsInput") seatsInput: ElementRef;

  //this section is to check drivers and passengers status
  @ViewChild("isDriver") isDriverInput: ElementRef;
  @ViewChild("isNotDriver") isNotDriverInput: ElementRef;
  @ViewChild("lg") lg: ElementRef;

  constructor(private httpClient: HttpClient, private fb: FormBuilder, private ms: MembersService, public router: Router) {

    this.signupForm = fb.group({
      'firstname': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
      'lastname': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
      'lifegroup': [null, Validators.compose([Validators.required])],
      //'suburb': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')])],
      'numberOfSeats': [],
      'validate': ''
    });
  }

  ngOnInit() {
    this.units = this.ms.getLifeGroup();
  }

  //make a post request to the api to store that member to the database
  onSubmit() { 
    const name = this.firstName.nativeElement.value + " " + this.lastName.nativeElement.value;
    if (this.driver) {
      this.numberOfSeats = this.seatsInput.nativeElement.value;
    }
    this.httpClient.post('http://transportappbackend-env.2xbitmvids.us-east-2.elasticbeanstalk.com/api/member', {
      lg: this.lg.nativeElement.value,
      name: name,
      auth: "pw1234",
      seats: this.numberOfSeats,
      suburb: this.suburbInput.nativeElement.value
    })
      .subscribe(
        (data: any[]) => {
          console.log(data);
        }
      )
    this.router.navigate(['/managing-people']);
  }

  //handles the radio button "are you a driver"
  checkDriver() {
    if (this.isDriverInput.nativeElement.checked) {
      this.driver = true;
      this.signupForm.controls['numberOfSeats'].setValidators(Validators.compose([Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1), Validators.max(7)]));
    } else if (this.isNotDriverInput.nativeElement.checked) {
      this.driver = false;
      this.signupForm.controls['numberOfSeats'].clearValidators();
    }
    this.signupForm.controls['numberOfSeats'].updateValueAndValidity();
  }

  //search for the full suburb name followed by a postcode
  searchPostcode() {
    const suburb = this.suburbInput.nativeElement.value;
    this.suburbs = this.ms.searchPostCode(suburb);
  }
}