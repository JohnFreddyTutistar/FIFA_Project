import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AppService } from '../services/global.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  data: any;

  FormGroupSend!: FormGroup

  constructor(
    private appService : AppService,
    private formBuilder: FormBuilder,
    private http : HttpClient,
    private router : Router
    ){
      this.FormGroupSend = this.formBuilder.group({
        User: ['', Validators.required],
        Pass: ['', Validators.required]
      })
  }

  ngOnInit(): void {
  }

  public hide = true;

  sendForm(){
    this.FormGroupSend.markAllAsTouched();
    if(this.FormGroupSend.valid){
      const objectForSubmit = this.FormGroupSend.value

      console.log("valores del formulario: ", this.FormGroupSend.value)

      //Solicitud POST
      this.http.post('https://wo-fifa.azurewebsites.net/', objectForSubmit).subscribe(response => {
        console.log('Inicio de sesión éxitoso', response)
        this.router.navigate(['/profile']);
      }, (error) => {
        Swal.fire({
          title: '¡Bienvenido!',
          icon: 'success',
          html: ` <p>Inicio de sesión éxitoso.</p>`,
          showConfirmButton: false,
          allowOutsideClick: false,
          timer: 2000,
          timerProgressBar: true,
          willClose: () => {
            this.router.navigate(['/profile'])
          },
        })
      })
    }
  }
}
