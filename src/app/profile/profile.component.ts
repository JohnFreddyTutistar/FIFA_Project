import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EquipmentRegisterComponent } from '../equipment-register/equipment-register.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(
    public dialog: MatDialog,
    private router: Router
    ){

  }

  registerItem(){
    this.router.navigate(['profile/register'])
  }

}
