import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

//below is ngx-bootstrap extention link is here: https://loiane.com/2017/08/how-to-add-bootstrap-to-an-angular-cli-project/ 
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
//above is ngx-bootstrap extention

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { SignupComponent } from './signup/signup.component';
import { ConfirmIdentityComponent } from './confirm-identity/confirm-identity.component';
import { SubmitRespondsComponent } from './submit-responds/submit-responds.component';
import { ManagingPeopleComponent } from './managing-people/managing-people.component';
import { ManagingTransportComponent } from './managing-transport/managing-transport.component';
import { AddPeopleComponent } from './add-people/add-people.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    SignupComponent,
    ConfirmIdentityComponent,
    SubmitRespondsComponent,
    ManagingPeopleComponent,
    ManagingTransportComponent,
    AddPeopleComponent,
    ProfileInfoComponent
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
