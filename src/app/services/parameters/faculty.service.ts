import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { FacultyModel } from 'src/app/models/parameters/faculty.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class FacultyService {
  url: string = GeneralData.MS_BONDING_URL;
  token: string = "";

  constructor(
    private http: HttpClient
    //private localStorageService: LocalStorageService
  ) {
    //this.token = this.localStorageService.GetToken();
   }

  GetRecordList(): Observable<FacultyModel[]>{
    return this.http.get<FacultyModel[]>(`${this.url}/facultads`)
  }

  SaveRecord(data: FacultyModel): Observable<FacultyModel>{
    return this.http.post<FacultyModel>(`${this.url}/facultads`, {
      nombre: data.nombre,
    },
    {headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })})
  }

  SearchRecord(id: number): Observable<FacultyModel>{
    return this.http.get<FacultyModel>(`${this.url}/facultads/${id}`);
  }

  EditRecord(data: FacultyModel): Observable<FacultyModel>{
    return this.http.put<FacultyModel>(`${this.url}/facultads/${data.id}`, {
      id: data.id,
      nombre: data.nombre,
    },
    {headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })})
  }

  RemoveRecord(id: number): Observable<any>{
    return this.http.delete<FacultyModel>(`${this.url}/facultads/${id}`,
    {headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })})
  }
}

