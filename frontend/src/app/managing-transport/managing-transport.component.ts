import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DISABLED } from '@angular/forms/src/model';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { MembersService } from '../members.service'
import { ngCopy } from 'angular-6-clipboard';

@Component({
  selector: 'app-managing-transport',
  templateUrl: './managing-transport.component.html',
  styleUrls: ['./managing-transport.component.scss'],
})
export class ManagingTransportComponent implements OnInit {

  drivers: Array<object>;
  passengers: Array<object>;
  sortedPassengers: object;
  unselected: Array<string> = [];
  transportForm: FormGroup;
  selectedPassengers: object = this.ms.selectedPassengers;
  displayPlan: Boolean = false;
  copied: Boolean = false;
  loggedIn: Boolean = false;
  clickedDisplay: Boolean = false;

  constructor(private httpClient: HttpClient, private fb: FormBuilder, private ms: MembersService) {

    this.transportForm = fb.group({
      'passengername': [null, Validators.required],
      'validate': ''
    });
  }

  ngOnInit() {
    this.drivers = this.ms.drivers;
    this.passengers = this.ms.passengers;
    console.log(this.passengers);    
    this.sortedPassengers = this.ms.sortedPassengers;
    this.sortPassengers(this.drivers, this.passengers);
    this.loggedIn = this.ms.loggedIn;
    this.unselected = this.ms.unselected;
  }
  animatePassenger(driver, passenger) {
    this.clickedDisplay = false;
    var passengers = this.ms.selectedPassengers[driver.name];
    if (passengers.length < driver.seats) {
      passengers.push(passenger);
      this.ms.selected.push(passenger.name);
      const i = this.ms.unselected.indexOf(passenger.name);
      this.ms.unselected.splice(i, 1);
      this.drivers.forEach((driver) => {
        var waitingPassengers = this.ms.sortedPassengers[driver['name']];
        const index = waitingPassengers.indexOf(passenger);
        this.ms.sortedPassengers[driver['name']].splice(index, 1);
      })
    }
  }

  cancelAlloc(driver, passenger) {
    this.copied = false;
    const index = this.ms.selectedPassengers[driver.name].indexOf(passenger);
    this.ms.selectedPassengers[driver.name].splice(index, 1);
    const i = this.ms.selected.indexOf(passenger.name);
    this.ms.selected.splice(i, 1);
    this.ms.unselected.push(passenger.name);
    this.clickedDisplay = false;
    this.displayPlan = false;
    this.drivers.forEach((driver) => {
      var pasCpy = Object.assign([], this.ms.sortedPassengers[driver['name']]);
      pasCpy.push(passenger);
      this.ms.sortedPassengers[driver['name']] = [];
      const driverPostcode = parseInt(driver['suburb'].slice(-4));
      console.log(driverPostcode);
      this.sortPassengersForAdriver(driverPostcode, pasCpy, this.ms.sortedPassengers[driver['name']]);
    })
  }

  generatePlan() {
    this.clickedDisplay = true;
    this.copied = false;
    this.drivers.forEach((driver) => {
      if (this.selectedPassengers[driver['name']].length > 0) {
        this.displayPlan = true;
        return;
      }
    })
  }
  

  sortPassengers(drivers, passengers) {
    const len = this.ms.passengers.length;
    drivers.forEach((driver) =>{
      const driverPostcode = parseInt(driver.suburb.slice(-4));
      var pas = Object.assign([], passengers);
      console.log(this.ms.selected);
      this.ms.sortedPassengers[driver.name] = new Array<Object>();
      for (var i = 0; i < len; i++) {
        const min = this.findMin(driverPostcode, pas);
        if (this.ms.selected.indexOf(min.name) == -1) {
          this.ms.sortedPassengers[driver.name].push(min);
        }
        const index = pas.indexOf(min);
        pas.splice(index, 1);
      }
    })
  }

  copy() {
    this.copied = true;
    var plan = "";
    this.ms.drivers.forEach((driver) => {
      plan += driver['name'] + "\n";
      this.ms.selectedPassengers[driver['name']].forEach((passenger) => {
        plan += "• " + passenger['name'] + "\n"
      }) 
    })
    ngCopy(plan);
  }

  logout() {
    this.ms.logout();
    this.passengers = [];
    this.drivers = [];
    this.unselected = [];
    this.loggedIn = false;
  }

  sortPassengersForAdriver(driverPostcode, pasCpy, waitingPassengers) {
    const len = pasCpy.length;
    for (var i = 0; i < len; i++) {
      const min = this.findMin(driverPostcode, pasCpy);
      waitingPassengers.push(min);
      const index = pasCpy.indexOf(min);
      pasCpy.splice(index, 1);
    }
  }

  findMin(driverPostcode, passengers) {
    if (passengers.length == 1) {
      return passengers[0];
    }
    var minDiff = 500;
    var closest;
    passengers.forEach((passenger) => {
      const diff = Math.abs(parseInt(passenger.suburb.slice(-4)) - driverPostcode);
      if (diff < minDiff) {
        minDiff = diff;
        closest = passenger;
      }
    })
    return closest;
  }
}
