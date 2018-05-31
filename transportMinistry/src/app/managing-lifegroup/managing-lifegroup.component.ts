import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscriber } from 'rxjs/Subscriber';

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
    
    this.httpClient.post(`https://my-json-server.typicode.com/leongcp93/dummieDB/groups`,{
      name: this.unit
    })
    .subscribe(
      (data:any[])=>{
        console.log(data);
        }
    )
   }

   delLifeGroup(index){

    console.log("deleted");

   }

   getLifeGroup(){
     this.httpClient.get(`https://my-json-server.typicode.com/leongcp93/dummieDB/groups`)
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
