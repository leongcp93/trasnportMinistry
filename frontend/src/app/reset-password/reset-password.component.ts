import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  
  @ViewChild("email") email: ElementRef;
  @ViewChild("password") password: ElementRef;

  constructor( private fb: FormBuilder) {

    this.resetPasswordForm = fb.group({
      'email': [null, Validators.required],
      'password': [null, Validators.required]
    })
   }

  ngOnInit() {
  }

  passwordReset(){

    console.log(this.email.nativeElement.value);
    console.log(this.password.nativeElement.value);

  }

}
