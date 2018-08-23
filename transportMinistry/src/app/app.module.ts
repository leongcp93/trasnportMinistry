import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponent } from './app-routing.module';

//below is ngx-bootstrap extention link is here: https://loiane.com/2017/08/how-to-add-bootstrap-to-an-angular-cli-project/ 
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
//above is ngx-bootstrap extention

//form module using reactive form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import animation module in here
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//below are all of the components of each page 
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { ConfirmIdentityComponent } from './confirm-identity/confirm-identity.component';
import { ManagingPeopleComponent } from './managing-people/managing-people.component';
import { ManagingTransportComponent } from './managing-transport/managing-transport.component';
import { AddPeopleComponent } from './add-people/add-people.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { AddPeopleRespondsComponent } from './add-people-responds/add-people-responds.component';
import { EventpageComponent } from './eventpage/eventpage.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { EditPageRespondComponent } from './edit-page-respond/edit-page-respond.component';
import { CreateEventRespondsComponent } from './create-event-responds/create-event-responds.component';
import { ManagingLifegroupComponent } from './managing-lifegroup/managing-lifegroup.component';
import { ManagingEventComponent } from './managing-event/managing-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EventEditPageComponent } from './event-edit-page/event-edit-page.component';
import { ListParticipantsComponent } from './list-participants/list-participants.component';

//http client module to get and post 
import { HttpClientModule } from '@angular/common/http';
import { Filter } from './filter.pipe';
import { MembersService } from './members.service';

@NgModule({
  declarations: [
    //component added in here to run it (make sure import it)
    AppComponent,
    HomeComponent,
    AdminComponent,
    ConfirmIdentityComponent,
    
    routingComponent,
    
    ManagingPeopleComponent,
    ManagingTransportComponent,
    AddPeopleComponent,
    
    ProfileInfoComponent,
    
    AddPeopleRespondsComponent,
    
    EventpageComponent,
    
    EditPageComponent,
    
    EditPageRespondComponent,
    
    CreateEventRespondsComponent,
    
    ManagingLifegroupComponent,
    
    ManagingEventComponent,
    
    EditEventComponent,
    
    EventEditPageComponent,
    
    ListParticipantsComponent,
    
    Filter
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [MembersService, Filter],
  bootstrap: [AppComponent]
})
export class AppModule { }