import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { RequestModel } from 'src/app/models/request/request.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UploadedFileModel } from 'src/app/models/uploaded.file.model';
import { RequestProponentModel } from 'src/app/models/request/request-proponent.model';
import { CommitteeModel } from 'src/app/models/parameters/committee.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  url: string = GeneralData.MS_REQUEST_URL;
  token: string = "";
  filter: string = `?filter={"include":[{"relation":"modalidad"},{"relation":"tipoSolicitud"},{"relation":"comites"}]}`;

  constructor(
    private http: HttpClient
    //private localStorageService: LocalStorageService
  ) {
    //this.token = this.localStorageService.GetToken();
  }

  GetRecordList(): Observable<RequestModel[]> {
    return this.http.get<RequestModel[]>(`${this.url}/solicitudes${this.filter}`)
  }

  GetProponents(id: number): Observable<RequestProponentModel[]> {
    return this.http.get<RequestProponentModel[]>(`${this.url}/solicitud-proponentes?filter={"where":{"solicitudId":${id}}}`)
  }

  GetComites(id: number): Observable<CommitteeModel[]> {
    return this.http.get<CommitteeModel[]>(`${this.url}/solicitud/${id}/comites`)
  }

  SaveRecord(data: RequestModel): Observable<RequestModel> {
    return this.http.post<RequestModel>(`${this.url}/solicitud-proponentes`, {
      fecha: data.fecha,
      nombreTrabajo: data.nombreTrabajo,
      descripcion: data.descripcion,
      modalidad: data.modalidadId,
      areaInvestigacionId: data.areaInvestigacionId,
      tipoSolicitudId: data.tipoSolicitudId,
      proponenteId: data.proponenteId,
      archivoZip: data.archivoZip,
    },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      })
  }

  SaveCommittees(id: number, data: number[]): Observable<boolean> {
    return this.http.post<boolean>(`${this.url}/relacionar-comites-a-solicitud/${id}`, {
      comites: data,
    },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      })
  }

  SaveProponents(id: number, data: number[]): Observable<boolean> {
    return this.http.post<boolean>(`${this.url}/relacionar-proponentes-a-solicitud/${id}`, {
      proponentes: data,
    },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      })
  }

  SearchRecord(id: number): Observable<RequestModel> {
    return this.http.get<RequestModel>(`${this.url}/solicitudes/${id}`);
  }

  EditRecord(data: RequestModel): Observable<RequestModel> {
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
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      })
  }

  RemoveRecord(id: number): Observable<any> {
    return this.http.delete<RequestModel>(`${this.url}/solicitudes/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      })
  }

  UploadFile(formData: FormData): Observable<UploadedFileModel> {
    return this.http.post<UploadedFileModel>(`${this.url}/CargarArchivoZip`, formData,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      })
  }
}
