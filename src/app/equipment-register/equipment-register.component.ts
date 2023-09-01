import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../services/global.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipment-register',
  templateUrl: './equipment-register.component.html',
  styleUrls: ['./equipment-register.component.scss']
})
export class EquipmentRegisterComponent {

  FormGroupSend!: FormGroup;

  constructor(
    private router : Router,
    private globalService : AppService,
    private formBuilder : FormBuilder
  ){
    this.FormGroupSend = this.formBuilder.group({
      Name: ['', Validators.required],
      Estadio: ['', Validators.required],
      WebSite: ['', Validators.required],
      Nacionality: ['', Validators.required],
      Date: ['', Validators.required],
      Coach: ['', Validators.required],
      Capacity: ['', Validators.required],
      Value: ['', Validators.required]
    })
  }

  sendForm(){
    this.FormGroupSend.markAllAsTouched();
    if(this.FormGroupSend.valid){
      const objectForSubmit = this.FormGroupSend.value
      console.log("valores a imprimir: ", objectForSubmit)

      this.globalService.postData('https://wo-fifa.azurewebsites.net/equipos/crear/', objectForSubmit)
        .subscribe({
          next: (res => {
            try {
              if(res.success){

              }
            }
            catch (e) {
              Swal.fire({
                title: 'Gracias por usar nuestro sistema',
                icon: 'success',
                html: ` <p>Tús equipo de futbol se ha asignado con éxito.</p>`,
                showConfirmButton: false,
                allowOutsideClick: false,
                timer: 3000,
                timerProgressBar: true,
                willClose: () => {
                  this.router.navigate(['/profile'])
                },
              });
            }
          })
        })
    }
  }
}
