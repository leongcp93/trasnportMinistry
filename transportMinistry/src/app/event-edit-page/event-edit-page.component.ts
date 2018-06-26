import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscriber } from 'rxjs/Subscriber';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-edit-page',
  templateUrl: './event-edit-page.component.html',
  styleUrls: ['./event-edit-page.component.scss']
})
export class EventEditPageComponent implements OnInit {

eventEditForm:FormGroup;
editTime: string='';
editDate: string='';
editFrom: string='';
editDestination: string='';
editDescription: string='';

//getting IDs
@ViewChild("editTimeInput") editTimeInput: ElementRef;
@ViewChild("editDateInput") editDateInput: ElementRef;
@ViewChild("editFromInput") editFromInput: ElementRef;
@ViewChild("editToInput") editToInput: ElementRef;
@ViewChild("editDescription") editDescriptionInput: ElementRef;

  constructor(private httpClient:HttpClient,private fb: FormBuilder) {

    this.eventEditForm = fb.group({
      'time':[null, Validators.required],
      'date':[null, Validators.required],
      'from':[null, Validators.required],
      'destination':[null, Validators.required],
      'description':[null, Validators.required]
    })

   }

  ngOnInit() {
  }

  editInfo(){
    this.editTime = this.editTimeInput.nativeElement.value;
    this.editDate = this.editDateInput.nativeElement.value;
    this.editFrom = this.editFromInput.nativeElement.value;
    this.editDestination = this.editToInput.nativeElement.value;
    this.editDescription = this.editDescriptionInput.nativeElement.value;

    //set put httpclient

  }

}
