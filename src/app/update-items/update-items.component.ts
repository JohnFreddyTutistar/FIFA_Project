import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-items',
  templateUrl: './update-items.component.html',
  styleUrls: ['./update-items.component.scss']
})
export class UpdateItemsComponent {
  FormGroupSend!: FormGroup;

  item: string = '';

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

  searchEquipmentByid(id: string){
    this.globalService.getData('https://wo-fifa.azurewebsites.net/equipos/listar/', id)
      .subscribe({
        next: (result) => {
          try {
            this.setData(result.content)
          } catch{
            Swal.fire({
              title: 'Error',
              icon: 'error',
              html: `<p>Por favor intente de nuevo.</p>`,
              confirmButtonColor: '#085092',
              allowOutsideClick: false,
            });
          }
        }
      })
  }

  //seteamos la data del API
  setData(item: string){
    this.item = item

    this.FormGroupSend.get('Name')?.patchValue(
      this.item
    )
    this.FormGroupSend.get('Estadio')?.patchValue(
      this.item
    )
    this.FormGroupSend.get('WebSite')?.patchValue(
      this.item
    )
    this.FormGroupSend.get('Nacionality')?.patchValue(
      this.item
    )
    this.FormGroupSend.get('Date')?.patchValue(
      this.item
    )
    this.FormGroupSend.get('Coach')?.patchValue(
      this.item
    )
    this.FormGroupSend.get('Capacity')?.patchValue(
      this.item
    )
    this.FormGroupSend.get('Value')?.patchValue(
      this.item
    )
  }

  sendForm(){
    this.FormGroupSend.markAllAsTouched()
    if(this.FormGroupSend.valid){
      this.globalService.putData('https://wo-fifa.azurewebsites.net/equipos/actualizar', this.FormGroupSend.value)
      .subscribe({next: (res => {
        try {

        }
        catch {

        }
      })})
    }
  }
}
