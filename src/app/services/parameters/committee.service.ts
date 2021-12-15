import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { CommitteeModel } from 'src/app/models/parameters/committee.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CommitteeService {
  url: string = GeneralData.MS_REQUEST_URL;
  token: string = "";

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.token = this.localStorageService.GetToken();
   }

  GetRecordList(): Observable<CommitteeModel[]>{
    return this.http.get<CommitteeModel[]>(`${this.url}/comites`)
  }

  SaveRecord(data: CommitteeModel): Observable<CommitteeModel>{
    return this.http.post<CommitteeModel>(`${this.url}/comites`, {
      nombre: data.nombre,
    },
    {headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })})
  }

  SearchRecord(id: number): Observable<CommitteeModel>{
    return this.http.get<CommitteeModel>(`${this.url}/comites/${id}`);
  }

  EditRecord(data: CommitteeModel): Observable<CommitteeModel>{
    return this.http.put<CommitteeModel>(`${this.url}/comites/${data.id}`, {
      id: data.id,
      nombre: data.nombre,
    },
    {headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })})
  }

  RemoveRecord(id: number): Observable<any>{
    return this.http.delete<CommitteeModel>(`${this.url}/comites/${id}`,
    {headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })})
  }
}
