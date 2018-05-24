import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-people',
  templateUrl: './add-people.component.html',
  styleUrls: ['./add-people.component.scss']
})
export class AddPeopleComponent implements OnInit {

  addForm: FormGroup;
  post: any;
  name: string = ''; //for sample of validation refer https://www.youtube.com/watch?v=bo1Wu0aiigU 
  postcode: number;


  constructor(private httpClient:HttpClient,private fb: FormBuilder) {

    //These are the validation condition
    this.addForm =  fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
      'postcode': [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(4), Validators.maxLength(4) ])],
      'validate' : ''
    });

   }

  ngOnInit() {
  }

  setName(event:any){
    this.name=event.target.value;
  }

  setPostcode(event:any){
    this.postcode=event.target.value;
  }

  postSignUp(){
    this.httpClient.post(`https://my-json-server.typicode.com/leongcp93/dummieDB/Members`,{
      name: this.name,
      postcode: this.postcode
    })//change this when the legit url is there.
    .subscribe(
      (data:any[])=>{
        console.log(data);
          
        }
      
    )
  }

  //post method for the retrieved result
  addPost(post){

    this.name = post.name;
    this.postcode = post.postcode;

  }

}
