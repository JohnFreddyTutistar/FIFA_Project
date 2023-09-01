import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { AppService } from '../services/global.service';
import { InfoTable } from '../models/info.model';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

const DATA: InfoTable[] = [
  {
    id: 8,
    nombre: "Equipo 6",
    estadio: "Estadio 6",
    sitioWeb: "",
    nacionalidad: "Nacionalidad 6",
    fundacion: "2023-08-31T16:22:51.880+0000",
    entrenador: "Entrenador 6",
    capacidad: 12000,
    valor: 0
  },
];

@Component({
  selector: 'app-table-equipment',
  templateUrl: './table-equipment.component.html',
  styleUrls: ['./table-equipment.component.scss'],
})

export class TableEquipmentComponent implements OnInit {

  id: string = ''
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  FormGroupFilter: FormGroup<{
    FormControlFilterBy: FormControl;
    FormControlFilterString: FormControl;
    FormControlFilterFrom: FormControl;
    FormControlFilterTo: FormControl;
  }>;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = [
    'id',
    'nombre',
    'estadio',
    'sitio',
    'nacionalidad',
    'fundacion',
    'entrenador',
    'capacidad',
    'valor',
    'actionsColumn'
  ];

  dataSource = new MatTableDataSource<InfoTable>(DATA);


  constructor(
    private globalService : AppService,
    private router : Router,
    private formBuilder : FormBuilder
    ){
      this.FormGroupFilter = this.formBuilder.group({
        FormControlFilterBy: ['', Validators.required],
        FormControlFilterString: [''],
        FormControlFilterFrom: [''],
        FormControlFilterTo: ['']
      })
    }
    get formControlFilterBy() {
      return this.FormGroupFilter.controls.FormControlFilterBy;
    }
    get formControlFilterString() {
      return this.FormGroupFilter.controls.FormControlFilterString;
    }
    get formControlFilterFrom() {
      return this.FormGroupFilter.controls.FormControlFilterFrom;
    }
    get formControlFilterTo() {
      return this.FormGroupFilter.controls.FormControlFilterTo;
    }

    ngOnInit(): void {
      this.globalService.getDataTable().subscribe( res => {
        if(res.totalElements > 0){
          this.dataSource.data = res.content
        }
      })
    }

    filterValue!: {
      key: string,
      value: null,
      value2: null
    }
  // Filtrado rapido
  applyFilterFast(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Filtrar por tipo de id y fecha de fundación
  applyFilter(){
    this.FormGroupFilter.markAllAsTouched();
    if(this.FormGroupFilter.valid && this.formControlFilterBy.value) {
      this.filterValue.value2 = null;
      let formValues = this.FormGroupFilter.value;
      switch (formValues.FormControlFilterBy){
        case 'idItem':
          this.filterValue.key = formValues.FormControlFilterBy + '== @0';
          this.filterValue.value = formValues.FormControlFilterString;
          break;
        case 'dates':
          this.filterValue.key = formValues.FormControlFilterBy + ' >= @0 AND ' + formValues.FormControlFilterBy + ' <= @1 '
          this.filterValue.value =
            formValues.FormControlFilterFrom < formValues.FormControlFilterTo
            ? formValues.FormControlFilterFrom
            : formValues.FormControlFilterTo;
          this.filterValue.value2 =
          formValues.FormControlFilterFrom > formValues.FormControlFilterTo
            ? formValues.FormControlFilterFrom
            : formValues.FormControlFilterTo;
          break;

      }
    }
  }

  resetFilter(all:boolean){
    this.formControlFilterString.reset();
    this.formControlFilterFrom.reset();
    this.formControlFilterTo.reset();
  }

  // editItem(id: string){}
  editItem(){
    this.router.navigate(['/update'])
  }

  deleteItem(){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Seguro quieres eliminar este equipo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Borado!',
          'Tu equipo ha sido borrado.',
          'success'
        )
      }
    })
  }

}
