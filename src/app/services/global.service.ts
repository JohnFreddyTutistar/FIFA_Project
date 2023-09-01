import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InfoResponse } from '../models/info.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  private url: string = 'https://wo-fifa.azurewebsites.net/equipos'

  constructor(private http: HttpClient) {}

  getDataTable(){
    return this.http.get<InfoResponse>(`${this.url}/listar/0/1016`)
  }

  // -------------------------- Métodos HTTP globales -------------------------------- //

  /**
   * Método encargado de obtener la Data desde la base de datos, con conexión en BACK-END
   *
   * @param {string} api Variable complementaria para el EndPoint
   * @return Retorna la respuesta obtenida por el Back
   * @memberof GlobalService
   */
  getData(url: string, api: string): Observable<any> {
    return this.http.get(url + api);
  }

  /**
   * Método encargado de enviar la data a la base de datos, con conexión en BACK-END
   *
   * @param port Variable donde se recibe el puerto de conexión al back
   * @param api Variable complementaria para el EndPoint
   * @param data Json con los datos enviado al back
   * @return Retorna la respuesta obtenida por el Back
   * @memberof GlobalServiceService
   */
  postData(url: string, api?: string, data?: any): Observable<any> {
    return this.http.post(url + api, data);
  }

  /**
   * Método encargado de editar la data y enviarla a la DB
   *
   * @param port Variable donde se recibe el puerto de conexión al back
   * @param api Variable complementaria para el EndPoint
   * @param data Variable en donde se envia la Data a insertar en la DB
   * @param id Id del objeto a actualizar
   * @returns Retorna la data al Back
   */
  putData(url: string, api: string, data?: any): Observable<any> {
    return this.http.put(url + api, data);
  }

  /**
   * Método encargado de eliminar la Data seleccionada
   * Recordar enviar el ID o el parametro necesario por el Back en la variable API
   *
   * @param port Variable donde se recibe el puerto de conexión al back
   * @param api Variable complementaria para el EndPoint
   * @param id Id del objeto a eliminar
   * @returns Retorna la data al Back
   */
  deleteData(url: string, api: string, id: any): Observable<any> {
    return this.http.delete(url + api + id);
  }
}
