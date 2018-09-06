import { Component, OnInit } from '@angular/core';
import { MembersService } from '../members.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private ms: MembersService) { }

  ngOnInit() {
  }

  logout() {
    this.ms.members = [];
    this.ms.passengers = [];
    this.ms.drivers = [];
    this.ms.selected = [];
  }
}
