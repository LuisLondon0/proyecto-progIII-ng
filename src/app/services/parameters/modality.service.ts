import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { ModalityModel } from 'src/app/models/parameters/modality.model';

@Injectable({
  providedIn: 'root'
})
export class ModalityService {
  url: string = GeneralData.MS_REQUEST_URL;
  token: string = "";

  constructor(
    private http: HttpClient
    //private localStorageService: LocalStorageService
  ) {
    //this.token = this.localStorageService.GetToken();
   }

  GetRecordList(): Observable<ModalityModel[]>{
    return this.http.get<ModalityModel[]>(`${this.url}/modalidades`)
  }

  SaveRecord(data: ModalityModel): Observable<ModalityModel>{
    return this.http.post<ModalityModel>(`${this.url}/modalidades`, {
      nombre: data.nombre,
    },
    {headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })})
  }

  SearchRecord(id: number): Observable<ModalityModel>{
    return this.http.get<ModalityModel>(`${this.url}/modalidades/${id}`);
  }

  EditRecord(data: ModalityModel): Observable<ModalityModel>{
    return this.http.put<ModalityModel>(`${this.url}/modalidades/${data.id}`, {
      id: data.id,
      nombre: data.nombre,
    },
    {headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })})
  }

  RemoveRecord(id: number): Observable<any>{
    return this.http.delete<ModalityModel>(`${this.url}/modalidades/${id}`,
    {headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })})
  }
}