import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SubmitRespondsComponent } from './submit-responds/submit-responds.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ManagingTransportComponent } from './managing-transport/managing-transport.component';
import { ManagingPeopleComponent } from './managing-people/managing-people.component';
import { HomeComponent } from './home/home.component';
import { AddPeopleComponent } from './add-people/add-people.component';
import { AddPeopleRespondsComponent } from './add-people-responds/add-people-responds.component';
import { AdminComponent } from './admin/admin.component';
import { EventpageComponent } from './eventpage/eventpage.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { EditPageRespondComponent } from './edit-page-respond/edit-page-respond.component';
import { CreateEventRespondsComponent } from './create-event-responds/create-event-responds.component';

//this is where i changed refer this https://www.youtube.com/watch?v=Nehk4tBxD4o&t=399s for sample
const routes: Routes = [
  {path: 'signup', component: SignupComponent},
  {path: 'submit-responds', component: SubmitRespondsComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'profile-info', component: ProfileInfoComponent},
  {path: 'managing-transport', component: ManagingTransportComponent},
  {path: 'managing-people', component: ManagingPeopleComponent},
  {path: 'home', component: HomeComponent},
  {path: 'add-people', component: AddPeopleComponent},
  {path: 'add-people-responds', component: AddPeopleRespondsComponent},
  {path: 'eventpage', component: EventpageComponent},
  {path: 'edit-page', component: EditPageComponent},
  {path: 'edit-page-respond', component: EditPageRespondComponent},
  {path: 'create-event-responds', component: CreateEventRespondsComponent},
  {path: '**', component:SignupComponent}

];
//above is what i changed

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [
  //below is add the component to link it together
  SignupComponent, 
  SubmitRespondsComponent,
  AdminComponent,
  ProfileInfoComponent, 
  ManagingTransportComponent, 
  ManagingPeopleComponent, 
  HomeComponent, 
  AddPeopleComponent, 
  AddPeopleRespondsComponent,
  EventpageComponent
]