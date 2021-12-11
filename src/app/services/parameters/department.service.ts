import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { DepartmentModel } from 'src/app/models/parameters/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  url: string = GeneralData.MS_BONDING_URL;
  token: string = "";
  filter: string = `?filter={"include":[{"relation":"facultad"}]}`;

  constructor(
    private http: HttpClient
    //private localStorageService: LocalStorageService
  ) {
    //this.token = this.localStorageService.GetToken();
   }

  GetRecordList(): Observable<DepartmentModel[]>{
    return this.http.get<DepartmentModel[]>(`${this.url}/departamentos${this.filter}`)
  }

  SaveRecord(data: DepartmentModel): Observable<DepartmentModel>{
    return this.http.post<DepartmentModel>(`${this.url}/departamentos`, {
      nombre: data.nombre,
      facultadId: data.facultadId
    },
    {headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })})
  }

  SearchRecord(id: number): Observable<DepartmentModel>{
    return this.http.get<DepartmentModel>(`${this.url}/departamentos/${id}`);
  }

  EditRecord(data: DepartmentModel): Observable<DepartmentModel>{
    return this.http.put<DepartmentModel>(`${this.url}/departamentos/${data.id}`, {
      id: data.id,
      nombre: data.nombre,
      facultadId: data.facultadId
    },
    {headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })})
  }

  RemoveRecord(id: number): Observable<any>{
    return this.http.delete<DepartmentModel>(`${this.url}/departamentos/${id}`,
    {headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })})
  }
}
