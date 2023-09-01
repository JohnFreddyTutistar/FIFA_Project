import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  logout: boolean = false;

  constructor(private router: Router){

  }

  loginComponent(){
    this.router.navigate(['/login'])
  }

  onLogout(){

  }

}
