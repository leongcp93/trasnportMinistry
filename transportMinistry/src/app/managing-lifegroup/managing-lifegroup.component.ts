import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscriber } from 'rxjs/Subscriber';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-managing-lifegroup',
  templateUrl: './managing-lifegroup.component.html',
  styleUrls: ['./managing-lifegroup.component.scss']
})
export class ManagingLifegroupComponent implements OnInit {

  lifeGroupForm: FormGroup;
  unit: string = '';
  getUnit: Array<string> = [''];
  i: number;

  @ViewChild("lifeGroup") lifeGroup:ElementRef;

  constructor(private httpClient: HttpClient, private fb: FormBuilder) {


   }

   addLifeGroup(event: any){
    
    this.unit=this.lifeGroup.nativeElement.value;
    
    this.httpClient.post(`http://www.transport.hope-church.com.au:4200/api/lifegroup?lg=${this.unit}&passcode=pw1234`,{
      name: this.unit
    })
    .subscribe(
      (data:any[])=>{
        console.log(data);
        }
    )
   }

   //this one is not fully function yet.
   delLifeGroup(getUnit){
    if(confirm("Are you sure delete this lifegroup?")){
      const url = `${"http://www.transport.hope-church.com.au:4200/api/lifegroup"}/${getUnit}}`; //this is required the url
      return this.httpClient.delete(url).toPromise()
      .then(() => {
        this.getLifeGroup();
      })

    }
    console.log("deleted");

   }

   getLifeGroup(){
     this.httpClient.get(`http://www.transport.hope-church.com.au:4200/api/lifegroup`)
     .subscribe(
      (data:any[])=>{
        if (data.length){
          for (this.i=0; this.i<data.length; this.i++){
            this.getUnit[this.i] = data[this.i].name;
            //console.log(this.getUnit[this.i]);
          }
        }
        }
     )
   }

  ngOnInit() {

 this.getLifeGroup();

  }

}
