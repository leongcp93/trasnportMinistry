import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
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
    const url = "http://localhost:4300/api/lifegroup";
    this.httpClient.post(url, {
      "lg": this.unit,
      "auth": 'pw1234'
    }, {responseType: 'text'}).toPromise()
    .then(() => {
      this.getLifeGroup();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  //this one is not fully function yet.
  delLifeGroup(getUnit) {
    if (confirm("Are you sure delete this lifegroup?")) {
      const url = "http://localhost:4300/api/lifegroup?passcode=pw1234&lg=" + getUnit; //this is required the url
      this.httpClient.delete(url, {responseType: 'text'}).toPromise()
      .then(() => {
        this.getLifeGroup();
        var index = this.getUnit.indexOf(this.unit);
        this.getUnit.splice(index, 1)
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  getLifeGroup() {
    this.httpClient.get(`http://localhost:4300/api/lifegroup?passcode=pw1234`)
      .subscribe(
        (data: any[]) => {
          if (data.length) {
            this.getUnit = [''];
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
