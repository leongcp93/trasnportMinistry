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

  //driver: string = '';
  drivers: Array<object>;
  passengers: Array<object>;
  sortedPassengers: object = {};
  transportForm: FormGroup;
  selectedPassengers: object = this.ms.selectedPassengers;
  displayPlan: boolean = false;
  copied: boolean = false;

  constructor(private httpClient: HttpClient, private fb: FormBuilder, private ms: MembersService) {

    this.transportForm = fb.group({
      'passengername': [null, Validators.required],
      'validate': ''
    });
  }

  ngOnInit() {
    this.drivers = this.ms.drivers;
    this.passengers = this.ms.passengers;
    this.sortPassengers(this.drivers, this.passengers);
  }

  animatePassenger(driver, passenger) {
    var passengers = this.selectedPassengers[driver.name];
    if (passengers.length < driver.seats) {
      passengers.push(passenger);
      this.ms.selected.push(passenger.name);
      const i = this.ms.unselected.indexOf(passenger.name);
      this.ms.unselected.splice(i, 1);
      this.drivers.forEach((driver) => {
        var waitingPassengers = this.sortedPassengers[driver['name']];
        const index = waitingPassengers.indexOf(passenger);
        waitingPassengers.splice(index, 1);
      })
    }
  }

  cancelAlloc(driver, passenger) {
    this.copied = false;
    const index = this.selectedPassengers[driver.name].indexOf(passenger);
    this.selectedPassengers[driver.name].splice(index, 1);
    const i = this.ms.selected.indexOf(passenger.name);
    this.ms.selected.splice(i, 1);
    this.ms.unselected.push(passenger.name);
    this.displayPlan = false;
    this.drivers.forEach((driver) => {
      var pasCpy = Object.assign([], this.sortedPassengers[driver['name']]);
      pasCpy.push(passenger);
      this.sortedPassengers[driver['name']] = [];
      this.sortPassengersForAdriver(driver, pasCpy, this.sortedPassengers[driver['name']]);
    })
  }

  generatePlan() {
    this.copied = false;
    this.displayPlan = true;
  }
  sortPassengersForAdriver(driver, pasCpy, waitingPassengers) {
    const driverPostcode = parseInt(driver.suburb.slice(-4));
    const len = pasCpy.length;
    for (var i = 0; i < len; i++) {
      const min = findMin(driverPostcode, pasCpy);
      waitingPassengers.push(min);
      const index = pasCpy.indexOf(min);
      pasCpy.splice(index, 1);
    }
  }

  sortPassengers(drivers, passengers) {
    const len = passengers.length;
    drivers.forEach((driver) =>{
      const driverPostcode = parseInt(driver.suburb.slice(-4));
      var pas = Object.assign([], passengers);
      for (var i = 0; i < len; i++) {
        if (this.sortedPassengers[driver.name] == null) {
          this.sortedPassengers[driver.name] = new Array<Object>();
        }
        const min = findMin(driverPostcode, pas);
        if (this.ms.selected.indexOf(min.name) == -1) {
          this.sortedPassengers[driver.name].push(min);
        }
        const i = pas.indexOf(min);
        pas.splice(i, 1);
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
}

function findMin(driverPostcode, passengers) {
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