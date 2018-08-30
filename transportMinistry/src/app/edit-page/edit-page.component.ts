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
  @ViewChild("postcode") inputPostcode: ElementRef;
  @ViewChild("seats") inputSeats: ElementRef;

  constructor(private fb: FormBuilder, private httpClient:HttpClient, private ms: MembersService) {
    this.editForm = fb.group ({
      'postcode':[null, Validators.compose([Validators.pattern('^[0-9]+$'), Validators.minLength(4), Validators.maxLength(4)])],
      'seats': [null, Validators.compose([Validators.pattern('^[0-9]+$'), Validators.min(0), Validators.max(7)])],
      'validate': ''
    })
   }

  ngOnInit() {
    this.member = this.ms.personToEdit;
  }

  onEdit(){

    this.httpClient.put('http://localhost:4300/api/member',{
      lg: "uq6",
      name: this.member['name'],
      postcode: this.inputPostcode.nativeElement.value,
      seats: this.inputSeats.nativeElement.value,
      auth: "pw1234"
    })
    .subscribe()
  }
}