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
  name: Array<string> = [''];
  postcode: Array<string> = [''];
  resultpostcode: string = '';
  managingForm: FormGroup;
  lifeGroup: string = 'uq6';
  post: any;
  passcode: string = 'pw1234';
  space: number;
  i: number;
  counter: number;
  members: Array<Object> = [];
  dataMember: Array<string> = [''];
  currentPost: any;
  query = '';
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
      this.members = this.ms.getPassenger();
    })
  }

  editPerson(member) {
    this.ms.personToEdit = member;
  }

  ngOnInit() {
    this.members = this.ms.getPassenger();
  }

}


