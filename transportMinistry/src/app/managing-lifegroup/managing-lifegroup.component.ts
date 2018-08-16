import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { RouterLink } from '@angular/router';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-managing-lifegroup',
  templateUrl: './managing-lifegroup.component.html',
  styleUrls: ['./managing-lifegroup.component.scss']
})
export class ManagingLifegroupComponent implements OnInit {

  lifeGroupForm: FormGroup;
  unit: string = '';
  getUnit: Array<string> = [''];
  i: number;

  @ViewChild("lifeGroup") lifeGroup: ElementRef;

  constructor(private httpClient: HttpClient, private fb: FormBuilder) {


  }

  addLifeGroup(event: any) {
    this.unit = this.lifeGroup.nativeElement.value;
    this.httpClient.post('http://localhost:4300/api/lifegroup', {
      "lg": this.unit,
      "auth": "pw1234"
    }).toPromise()
    .then(() => {
      this.getLifeGroup();
    })
  }

  //this one is not fully function yet.
  delLifeGroup(getUnit) {
    if (confirm("Are you sure delete this lifegroup?")) {
      const url = 'http://localhost:4300/api/lifegroup?passcode=pw1234&lg=' + getUnit; //this is required the url
      this.httpClient.delete(url).toPromise()
      .then(() => {
        this.getLifeGroup();
      })
    }
  }

  getLifeGroup() {
    this.getUnit = [''];
    this.httpClient.get(`http://localhost:4300/api/lifegroup?passcode=pw1234`)
      .subscribe(
        (data: any[]) => {
          if (data.length) {
            for (this.i = 0; this.i < data.length; this.i++) {
              this.getUnit[this.i] = data[this.i].name;
              //console.log(this.getUnit[this.i]);
            }
          }
        }
      )
  }
  ngOnInit() {
    this.getLifeGroup();
  }

}
