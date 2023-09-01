import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { EquipmentRegisterComponent } from './equipment-register/equipment-register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UpdateItemsComponent } from './update-items/update-items.component';


const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'profile/:register', component: EquipmentRegisterComponent},
  // {path: 'update/:id', component: UpdateItemsComponent},
  {path: 'update', component: UpdateItemsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
