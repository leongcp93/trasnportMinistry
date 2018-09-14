import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  displayChecklist: boolean = false;
  filter: boolean = false;
  @ViewChild("filterInput") filterInput: ElementRef;
  //private headers = new Headers({'Content-Type': 'application/json'}); 

  constructor(private httpClient: HttpClient, private fb: FormBuilder, private ms: MembersService) {
    //This is for validation on the name.
    this.managingForm = fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
      'validate': ''
    });
  }

  //this is the event handeling
  onName() {
    const query = this.filterInput.nativeElement.value;
    if (query.length > 0) {
      this.filter = true;
    } else {
      this.filter = false;
    }
    this.members = this.ms.filterPassengers(query);
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
    this.ms.ticked = true;
    if (this.filter) {
      const query = this.filterInput.nativeElement.value;
      this.members = this.ms.filterPassengers(query);
    } 
  }

  ngOnInit() {
    this.lifeGroup = this.ms.adminLg;
    if (this.ms.members.length == 0 && !this.ms.ticked) {
      this.members = this.ms.getPeople();
    } else {
      this.members = this.ms.members;
    }
    
  }

  popUp() {
    this.displayChecklist = true;
  }

  closePopup() {
    this.displayChecklist = false;
  }
  
  delAlloc(member) {
    
    if (member.seats > 0) {
      const i = this.ms.drivers.indexOf(member);
      this.ms.drivers.splice(i, 1);
      this.ms.totalSeats -= member.seats;
    } else {
      const i = this.ms.passengers.indexOf(member);
      this.ms.passengers.splice(i, 1);
    }
    this.ms.members.push(member);
    const j = this.ms.unselected.indexOf(member);
    this.ms.unselected.splice(j, 1);
  }

}


