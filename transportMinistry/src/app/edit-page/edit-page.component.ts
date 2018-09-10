import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MembersService } from '../members.service'

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})

export class EditPageComponent implements OnInit {
  editForm: FormGroup;
  member: Object;
  suburbs: Array<string> = [];
  @ViewChild("suburbInput") suburbInput: ElementRef;
  @ViewChild("seats") inputSeats: ElementRef;

  constructor(private fb: FormBuilder, private httpClient:HttpClient, private ms: MembersService) {
    this.editForm = fb.group ({
      'seats': [null, Validators.compose([Validators.pattern('^[0-9]+$'), Validators.min(0), Validators.max(7)])],
      'validate': ''
    })
   }

  ngOnInit() {
    this.member = this.ms.personToEdit;
  }

  searchPostcode() {
    const suburb = this.suburbInput.nativeElement.value;
    this.suburbs = this.ms.searchPostCode(suburb);
  }

  onEdit(){

    this.httpClient.put('http://localhost:4300/api/member',{
      lg: this.ms.adminLg,
      name: this.member['name'],
      suburb: this.suburbInput.nativeElement.value,
      seats: this.inputSeats.nativeElement.value,
      auth: "pw1234"
    })
    .subscribe(
      (data: any) => {
        this.ms.members.forEach((member) => {
          if (member['name'] == this.member['name']) {
            member['suburb'] = this.suburbInput.nativeElement.value;
            member['seats'] = this.inputSeats.nativeElement.value;
          }
        })
      }
    );
  }
}