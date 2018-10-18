import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password-request',
  templateUrl: './reset-password-request.component.html',
  styleUrls: ['./reset-password-request.component.scss']
})
export class ResetPasswordRequestComponent implements OnInit {

  resetPasswordForm: FormGroup;
  loading: Boolean = false;
  sent: Boolean = false;
  err: String = "";
  @ViewChild("lifegroup") lifegroup: ElementRef;

  constructor(private httpClient: HttpClient, private fb: FormBuilder) {

    this.resetPasswordForm = fb.group({
      'lg': [null, Validators.required]
    })
   }

  ngOnInit() {
  }

  onSubmit(){
    this.sent = false;
    this.err = "";
    this.loading = true;
    const lg = this.lifegroup.nativeElement.value;
    this.httpClient.get("http://localhost:5000/api/reset-password-request?lg=" + lg)
    .subscribe((data:any) => {
      console.log(data);
      this.loading = false;
      if (data.msg == "Mail sent") {
        this.sent = true;
      } else {
        this.err = data.msg;
      }
    })
  }

}
