import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-add-people',
  templateUrl: './add-people.component.html',
  styleUrls: ['./add-people.component.scss']
})
export class AddPeopleComponent {

  addForm: FormGroup;
  post: any;
  name: string = ''; //for sample of validation refer https://www.youtube.com/watch?v=bo1Wu0aiigU 
  postcode: number;
  @ViewChild("firstName") firstName: ElementRef;
  @ViewChild("lastName") lastName: ElementRef;
  @ViewChild("postcodeInput") postcodeInput: ElementRef;

  constructor(private httpClient:HttpClient,private fb: FormBuilder, private router: Router) {

    //These are the validation condition
    this.addForm =  fb.group({
      'firstname': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
      'lastname': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
      'postcode': [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(4), Validators.maxLength(4) ])],
      'validate' : ''
    });
   }

  postSignUp(){
    //setting value from the field 
    this.name=this.firstName.nativeElement.value + " " + this.lastName.nativeElement.value;
    this.postcode=this.postcodeInput.nativeElement.value;
    this.httpClient.post('http://localhost:4300/api/member',{
      lg: "uq6",
      name: this.name,
      postcode: this.postcode,
      auth: "pw1234"
    })
    .subscribe(
      (data:any[])=>{
        console.log(data);    
        this.router.navigate(["/add-people-responds"]);      
        }
    )
  }
}