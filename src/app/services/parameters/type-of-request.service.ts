import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { TypeOfRequestModel } from 'src/app/models/parameters/type-of-request.model';
import { UploadedFileModel } from 'src/app/models/uploaded.file.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TypeOfRequestService {
  url: string = GeneralData.MS_REQUEST_URL;
  token: string = "";

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.token = this.localStorageService.GetToken();
   }

  GetRecordList(): Observable<TypeOfRequestModel[]>{
    return this.http.get<TypeOfRequestModel[]>(`${this.url}/tipo-solicitudes`)
  }

  SaveRecord(data: TypeOfRequestModel): Observable<TypeOfRequestModel>{
    return this.http.post<TypeOfRequestModel>(`${this.url}/tipo-solicitudes`, {
      nombre: data.nombre,
      formato: data.formato,
    },
    {headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })})
  }

  SearchRecord(id: number): Observable<TypeOfRequestModel>{
    return this.http.get<TypeOfRequestModel>(`${this.url}/tipo-solicitudes/${id}`);
  }

  EditRecord(data: TypeOfRequestModel): Observable<TypeOfRequestModel>{
    return this.http.put<TypeOfRequestModel>(`${this.url}/tipo-solicitudes/${data.id}`, {
      id: data.id,
      nombre: data.nombre,
      formato: data.formato,
    },
    {headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })})
  }

  RemoveRecord(id: number): Observable<any>{
    return this.http.delete<TypeOfRequestModel>(`${this.url}/tipo-solicitudes/${id}`,
    {headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })})
  }

  UploadFile(formData: FormData): Observable<UploadedFileModel> {
    return this.http.post<UploadedFileModel>(`${this.url}/CargaFormato`, formData,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      })
  }
}