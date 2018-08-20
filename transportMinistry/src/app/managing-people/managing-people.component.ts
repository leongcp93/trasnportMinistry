import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscriber } from 'rxjs/Subscriber';
import { FormBuilder, FormGroup, Validators , FormsModule} from '@angular/forms';

@Component({
  selector: 'app-managing-people',
  templateUrl: './managing-people.component.html',
  styleUrls: ['./managing-people.component.scss']
})
export class ManagingPeopleComponent implements OnInit {

  //declaring the variables
  name: Array<string> = [''];
  postcode: Array<string> = [''];
  found: boolean; 
  resultname: string = '';
  resultpostcode: string = '';
  managingForm: FormGroup;
  lifeGroup: string = 'uq6';
  post: any;
  passcode: string ='pw1234';
  space: number;
  i: number;
  counter: number;
  members: Array<Object> = [];
  dataMember: Array<string> = [''];
  currentPost: any;
  //private headers = new Headers({'Content-Type': 'application/json'}); 

  constructor(private httpClient:HttpClient, private fb: FormBuilder, private changeDetector: ChangeDetectorRef) { 
//This is for validation on the name.
    this.managingForm = fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
      'validate': ''
    });
   }

//this is the event handeling
  onName(event:any){
    this.resultname = event.target.value;
    this.found=false;
    this.changeDetector.detectChanges();
  }

  /*delPeople(event:any){
    this.httpClient.delete(`http://www.transport.hope-church.com.au:4200/api/member`, {
      lg: this.lifeGroup,
      name: this.name[0],
      auth: this.passcode

    }).subscribe(
      (data:any[])=>{
        
      })
  }
*/
  getPassenger(){
    this.httpClient.get(`http://localhost:4300/api/member?passcode=pw1234&lg=uq6`)//change this when the legit url is there.
    .subscribe(
      (data:any[])=>{
        if (data.length) {
          for (this.i=0; this.i<data.length; this.i++){
            this.name[this.i] = data[this.i].name;
            this.postcode[this.i] = data[this.i].postcode;

            //this is where i group all the object into members
            //youtube refrence on object (https://www.youtube.com/watch?v=B7IKiDWp1Qk)
          this.members[this.i] = {
          name: this.name[this.i],
          postcode: this.postcode[this.i]
        }
          //this.space = data[0].space;
          //console.log(this.members[this.i]);
           
          }
        }
      }
    )
  }

  getName(){
    this.httpClient.get(`http://localhost:4300/api/member?passcode=pw1234&lg=uq6&name=${this.resultname}`)//change this when the legit url is there.
    .subscribe(
      (data:any[])=>{
        if (data.length) {
          this.resultname = data[0].name;
          this.resultpostcode = data[0].postcode;
          console.log(this.resultname);
          console.log(this.resultpostcode);
          this.found = true;
        }
      }
    )
  }

  ngOnInit() {
    this.getPassenger();
  }

}


