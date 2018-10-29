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

  constructor(private httpClient: HttpClient, private fb: FormBuilder,
     private ms: MembersService) {
  }

  delLifeGroup(getUnit) {
    if (confirm("Are you sure to delete this lifegroup?")) {
      const url = "http://transportappbackend-dev.ap-southeast-2.elasticbeanstalk.com/api/lifegroup?lg=" + getUnit; 
      this.httpClient.delete(url, {responseType: 'text'}).subscribe((data:any)=>{
        console.log(data);
        this.units = this.ms.getLifeGroup();
      })
    }
  }

  ngOnInit() {
    this.units = this.ms.getLifeGroup();
  }
}
