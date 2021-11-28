import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { RequestModel } from 'src/app/models/request/request.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  url: string = GeneralData.MS_REQUEST_URL;
  token: string = "";

  constructor(
    private http: HttpClient
    //private localStorageService: LocalStorageService
  ) {
    //this.token = this.localStorageService.GetToken();
   }

  GetRecordList(): Observable<RequestModel[]>{
    return this.http.get<RequestModel[]>(`${this.url}/solicitudes`)
  }

  SaveRecord(data: RequestModel): Observable<RequestModel>{
    return this.http.post<RequestModel>(`${this.url}/solicitudes`, {
      fecha: data.fecha,
      nombreTrabajo: data.nombreTrabajo,
      descripcion: data.descripcion,
      modalidadId: data.modalidadId,
      areaInvestigacionId: data.areaInvestigacionId,
      tipoSolicitudId: data.tipoSolicitudId,
      //archivoZip: data.archivoZip,
    },
    {headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })})
  }

  SearchRecord(id: number): Observable<RequestModel>{
    return this.http.get<RequestModel>(`${this.url}/solicitudes/${id}`);
  }

  EditRecord(data: RequestModel): Observable<RequestModel>{
    return this.http.put<RequestModel>(`${this.url}/solicitudes/${data.id}`, {
      id: data.id,
      fecha: data.fecha,
      nombreTrabajo: data.nombreTrabajo,
      descripcion: data.descripcion,
      modalidadId: data.modalidadId,
      areaInvestigacionId: data.areaInvestigacionId,
      tipoSolicitudId: data.tipoSolicitudId,
      archivoZip: data.archivoZip,
    },
    {headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })})
  }

  RemoveRecord(id: number): Observable<any>{
    return this.http.delete<RequestModel>(`${this.url}/solicitudes/${id}`,
    {headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })})
  }
}
