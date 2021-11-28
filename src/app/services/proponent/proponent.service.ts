import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { ProponentModel } from 'src/app/models/proponent/proponent.model';
import { UploadedFileModel } from 'src/app/models/proponent/uploaded.file.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class proponentService {
  url: string = GeneralData.MS_VINCULACION_URL;
  token: string = "";
  filter: string = `?filter={"include":[{"relation":"department"}, {"relation":"faculty"}, {"relation":"type-vinculation"}]}`;

  constructor(
    private http: HttpClient
  ) {

  }

  GetRecordList(): Observable<ProponentModel[]> {
    return this.http.get<ProponentModel[]>(`${this.url}/proponente-trabajos${this.filter}`);
  }

  SaveRecord(data: ProponentModel): Observable<ProponentModel> {
    return this.http.post<ProponentModel>(
      `${this.url}/proponente-trabajos`,
      {
        id: data.id,
        document: data.documento,
        firstName: data.primerNombre,
        otherName: data.otroNombre,
        firstLastName: data.primerApellido,
        otherLastName: data.otroApellido,
        email: data.correo,
        phone: data.celular,
        typeVinculationId: data.tipoVinculacionId
      },
      {
        headers: new HttpHeaders({
          //Authorization: `Bearer ${this.token}`
        })
      });
  }

  SearchRecord(id: number): Observable<ProponentModel> {
    return this.http.get<ProponentModel>(`${this.url}/proponente-trabajos/${id}`);
  }

  EditRecord(data: ProponentModel): Observable<ProponentModel> {
    return this.http.put<ProponentModel>(
      `${this.url}/proponente-trabajos/${data.id}`,
      {
        id: data.id,
        document: data.documento,
        firstName: data.primerNombre,
        otherName: data.otroNombre,
        firstLastName: data.primerApellido,
        otherLastName: data.otroApellido,
        email: data.correo,
        phone: data.celular,
        typeVinculationId: data.tipoVinculacionId
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

  UploadFile(formData: FormData): Observable<UploadedFileModel>{
    return this.http.post<UploadedFileModel>(
      `${this.url}/CargarImagenPrincipalProducto`,
      formData,
      {
        headers: new HttpHeaders({
          //Authorization: `Bearer ${this.token}`
        })
      });
  }

}
