import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { DepartmentModel } from 'src/app/models/parameters/department.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class departmentService {
  url: string = GeneralData.MS_VINCULACION_URL;
  token: string = "";

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.token = this.localStorageService.GetToken();
  }

  GetRecordList(): Observable<DepartmentModel[]> {
    return this.http.get<DepartmentModel[]>(`${this.url}/departamentos`);
  }

  SaveRecord(data: DepartmentModel): Observable<DepartmentModel> {
    return this.http.post<DepartmentModel>(
      `${this.url}/departamentos`,
      {
        name: data.nombre
      },
      {
        headers: new HttpHeaders({
          //Authorization: `Bearer ${this.token}`
        })
      });
  }

  SearchRecord(id: number): Observable<DepartmentModel>{
    return this.http.get<DepartmentModel>(`${this.url}/departamentos/${id}`);
  }

  EditRecord(data: DepartmentModel): Observable<DepartmentModel> {
    return this.http.put<DepartmentModel>(
      `${this.url}/departamentos/${data.id}`,
      {
        id: data.id,
        name: data.nombre
      },
      {
        headers: new HttpHeaders({
          //Authorization: `Bearer ${this.token}`
        })
      });
  }

  RemoveRecord(id: number): Observable<any>{
    return this.http.delete(
      `${this.url}/brands/${id}`,
      {
        headers: new HttpHeaders({
          //Authorization: `Bearer ${this.token}`
        })
      });
  }

}
