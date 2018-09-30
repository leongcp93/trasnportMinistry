import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SubmitRespondsComponent } from './submit-responds/submit-responds.component';
import { ManagingTransportComponent } from './managing-transport/managing-transport.component';
import { ManagingPeopleComponent } from './managing-people/managing-people.component';
import { HomeComponent } from './home/home.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { EditPageRespondComponent } from './edit-page-respond/edit-page-respond.component';
import { ManagingLifegroupComponent } from './managing-lifegroup/managing-lifegroup.component';
import { AdminSignupComponent } from './admin-signup/admin-signup.component';
import { AdminSignupRespondComponent } from './admin-signup-respond/admin-signup-respond.component'

//this is where i changed refer this https://www.youtube.com/watch?v=Nehk4tBxD4o&t=399s for sample
const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch:'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'submit-responds', component: SubmitRespondsComponent },
  { path: 'managing-transport', component: ManagingTransportComponent },
  { path: 'managing-people', component: ManagingPeopleComponent },
  { path: 'home', component: HomeComponent },
  { path: 'edit-page', component: EditPageComponent },
  { path: 'edit-page-respond', component: EditPageRespondComponent },
  { path: 'managing-lifegroup', component: ManagingLifegroupComponent },
  { path: 'admin-signup', component: AdminSignupComponent },  
  { path: 'admin-signup-respond', component: AdminSignupRespondComponent },
  { path: '**', component: SignupComponent }

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
  ManagingTransportComponent,
  ManagingPeopleComponent,
  HomeComponent
]