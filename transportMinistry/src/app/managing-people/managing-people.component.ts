import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { MembersService } from '../members.service'

@Component({
  selector: 'app-managing-people',
  templateUrl: './managing-people.component.html',
  styleUrls: ['./managing-people.component.scss']
})
export class ManagingPeopleComponent implements OnInit {

  //declaring the variables
 
  managingForm: FormGroup;
  lifeGroup: string;
  passcode: string = 'pw1234';
  members: Array<object> = [];
  //private headers = new Headers({'Content-Type': 'application/json'}); 

  constructor(private httpClient: HttpClient, private fb: FormBuilder, private ms: MembersService) {
    //This is for validation on the name.
    this.managingForm = fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
      'validate': ''
    });
  }

  //this is the event handeling
  onName(event: any) {
    this.members = this.ms.filterPassengers(event.target.value);
  }

  delPerson(name) {
    const url = "http://localhost:4300/api/member?lg="
      + this.lifeGroup + "&name=" + name + "&auth=" + this.passcode;
    this.httpClient.delete(url, { responseType: 'text' }).subscribe(() => {
      this.members = this.ms.getPeople();
    })
  }

  editPerson(member) {
    this.ms.personToEdit = member;
  }

  mark(member) {
    this.ms.markMember(member);
  }

  ngOnInit() {
    this.lifeGroup = this.ms.adminLg;
    this.members = this.ms.getPeople();
  }

}


