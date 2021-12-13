import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { DepartmentModel } from 'src/app/models/parameters/department.model';
import { ProponentModel } from 'src/app/models/proponent/proponent.model';
import { UploadedFileModel } from 'src/app/models/uploaded.file.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class proponentService {
  url: string = GeneralData.MS_BONDING_URL;
  token: string = "";
  filter: string = `?filter={"include":[{"relation":"departamentos"},{"relation":"tipoVinculacion"}]}`;

  constructor(
    private http: HttpClient
    //private localStorageService: LocalStorageService
  ) {
    //this.token = this.localStorageService.GetToken();
  }

  GetRecordList(): Observable<ProponentModel[]> {
    return this.http.get<ProponentModel[]>(`${this.url}/proponente-trabajos${this.filter}`);
  }

  GetDepartamentos(id: number): Observable<DepartmentModel[]> {
    return this.http.get<DepartmentModel[]>(`${this.url}/proponente-trabajos/${id}/departamentos`)
  }

  SaveRecord(data: ProponentModel): Observable<ProponentModel> {
    return this.http.post<ProponentModel>(
      `${this.url}/proponente-trabajos`, {
      documento: data.documento,
      primerNombre: data.primerNombre,
      otroNombre: data.otroNombre,
      primerApellido: data.primerApellido,
      otroApellido: data.otroApellido,
      correo: data.correo,
      celular: data.celular,
      foto: data.foto,
      tipoVinculacionId: data.tipoVinculacionId,
    },
      {
        headers: new HttpHeaders({
          //Authorization: `Bearer ${this.token}`
        })
      });
  }

  SaveDepartments(id: number, data: number[]): Observable<boolean> {
    return this.http.post<boolean>(`${this.url}/relacionar-proponentes-trabajo-departamento/${id}`, {
      arregloDepartamentos: data,
    },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      })
  }

  SearchRecord(id: number): Observable<ProponentModel> {
    return this.http.get<ProponentModel>(`${this.url}/proponente-trabajos/${id}`);
  }

  EditRecord(data: ProponentModel): Observable<ProponentModel> {
    return this.http.put<ProponentModel>(
      `${this.url}/proponente-trabajos/${data.id}`,
      {
        id: data.id,
        documento: data.documento,
        primerNombre: data.primerNombre,
        otroNombre: data.otroNombre,
        primerApellido: data.primerApellido,
        otroApellido: data.otroApellido,
        correo: data.correo,
        celular: data.celular,
        foto: data.foto,
        tipoVinculacionId: data.tipoVinculacionId,

      },
      {
        headers: new HttpHeaders({
          //Authorization: `Bearer ${this.token}`
        })
      });
  }

  RemoveRecord(id: number): Observable<any> {
    return this.http.delete(
      `${this.url}/proponente-trabajos/${id}`,
      {
        headers: new HttpHeaders({
          //Authorization: `Bearer ${this.token}`
        })
      });
  }

  UploadFile(formData: FormData): Observable<UploadedFileModel> {
    return this.http.post<UploadedFileModel>(
      `${this.url}/CargarImagenPrincipalProponente`,
      formData,
      {
        headers: new HttpHeaders({
          //Authorization: `Bearer ${this.token}`
        })
      });
  }

}
