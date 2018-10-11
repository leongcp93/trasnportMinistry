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
    this.loading = true;
    const header = new HttpHeaders({
      "Authorization": "Bearer " + this.token
    })
    const link = 'http://localhost:5000/api/reset-password?password='+this.password.nativeElement.value;
    this.httpClient.post(link, {}, {headers: header})
    .subscribe((data:any) => {
      console.log(data);
      this.loading = false;
    })
  }
}
