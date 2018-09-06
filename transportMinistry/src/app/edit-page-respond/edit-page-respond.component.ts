import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MembersService } from '../members.service'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-edit-page-respond',
  templateUrl: './edit-page-respond.component.html',
  styleUrls: ['./edit-page-respond.component.scss']
})
export class EditPageRespondComponent implements OnInit {


  constructor(private ms: MembersService) { }

  ngOnInit() {
  }

}
