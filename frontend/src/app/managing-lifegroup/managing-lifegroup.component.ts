import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Observable} from 'rxjs';
import { MembersService } from '../members.service'

@Component({
  selector: 'app-managing-lifegroup',
  templateUrl: './managing-lifegroup.component.html',
  styleUrls: ['./managing-lifegroup.component.scss']
})
export class ManagingLifegroupComponent implements OnInit {

  lifeGroupForm: FormGroup;
  units: Array<string> = [];

  @ViewChild("lifeGroup") lifeGroup: ElementRef;

  constructor(private httpClient: HttpClient, private fb: FormBuilder, private ms: MembersService) {


  }

  addLifeGroup(event: any) {
    const url = "http://hope-transport-api.us-east-2.elasticbeanstalk.com/api/lifegroup";
    this.httpClient.post(url, {
      "lg": this.lifeGroup.nativeElement.value,
      "auth": 'pw1234'
    }, {responseType: 'text'}).subscribe(() => {
      this.units = this.ms.getLifeGroup();
      
    })
  }

  delLifeGroup(getUnit) {
    if (confirm("Are you sure delete this lifegroup?")) {
      const url = "http://hope-transport-api.us-east-2.elasticbeanstalk.com/api/lifegroup?passcode=pw1234&lg=" + getUnit; 
      this.httpClient.delete(url, {responseType: 'text'}).subscribe(()=>{
        this.units = this.ms.getLifeGroup();
      })
    }
  }

  ngOnInit() {
    this.units = this.ms.getLifeGroup();
  }
}
