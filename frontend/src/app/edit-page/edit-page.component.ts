import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MembersService } from '../members.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})

export class EditPageComponent implements OnInit {
  editForm: FormGroup;
  member: Object;
  suburbs: Array<string> = [];
  dirty: Boolean = false;
  @ViewChild("suburbInput") suburbInput: ElementRef;
  @ViewChild("seats") inputSeats: ElementRef;

  constructor(private fb: FormBuilder, private httpClient:HttpClient, 
    private ms: MembersService, private router: Router) {
    this.editForm = fb.group ({
      'suburb': [],
      'seats': [],
      'validate': ''
    })
   }

  ngOnInit() {
    this.member = this.ms.personToEdit;
  }

  searchPostcode() {
    const suburb = this.suburbInput.nativeElement.value;
    if (suburb.indexOf(',')!= -1) {
      return;
    }
    if (suburb == '') {
      this.dirty = false;  
    } else {
      this.dirty = true;
    }
    this.suburbs = this.ms.searchPostCode(suburb);
    if (this.editForm.controls['suburb'].validator == null) {
      this.editForm.controls['suburb'].setValidators(this.ms.suburbValidator);
      this.editForm.controls['suburb'].updateValueAndValidity();
    }
  }

  selectSuburb(sub) {
    this.suburbInput.nativeElement.value = sub;
    this.suburbs = [];
    this.editForm.controls['suburb'].clearValidators();
    this.editForm.controls['suburb'].updateValueAndValidity();
    this.dirty = false;
  }

  onKey() {
    if (this.editForm.controls['seats'].validator == null) {
      this.editForm.controls['seats'].setValidators(Validators.compose([
        Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(0), Validators.max(7)]));
        this.editForm.controls['seats'].updateValueAndValidity();
    }
  }

  onSubmit() {
    this.httpClient.put('http://transportappbackend-dev.ap-southeast-2.elasticbeanstalk.com/api/member',{
      lg: this.ms.adminLg,
      name: this.member['name'],
      suburb: this.suburbInput.nativeElement.value,
      seats: this.inputSeats.nativeElement.value,
    }, {headers: this.ms.header})
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
    this.router.navigate(['/edit-page-respond']);
  }
}