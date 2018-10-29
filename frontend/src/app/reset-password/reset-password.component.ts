import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  token: string;
  loading: Boolean = false;
  success: Boolean = false;
  err: String = "";
  @ViewChild("password") password: ElementRef;

  constructor(private httpClient: HttpClient, private fb: FormBuilder, 
    private route: ActivatedRoute) {
    this.resetPasswordForm = fb.group({
      'password': [null, Validators.required]
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.token = params['token'];
    });
  }

  onSubmit() {
    this.success = false;
    this.err = "";
    this.loading = true;
    const header = new HttpHeaders({
      "Authorization": "Bearer " + this.token
    })
    const link = 'http://transportappbackend-dev.ap-southeast-2.elasticbeanstalk.com/api/reset-password?password='+this.password.nativeElement.value;
    this.httpClient.post(link,{}, {headers: header})
    .subscribe((data:any) => {
      if (data.msg == "success") {
        this.loading = false;
        this.success = true;
      }
    }
    ,(error) => {
      if (error.error.msg == "Token has expired") {
        this.loading = false;
        this.err = "expired";
      } else {
        this.err = error.error.msg;
      }
    }
    )
  }
}
