import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { TypeVinculationModel } from 'src/app/models/parameters/type-vinculation.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class typeVinculationService {
  url: string = GeneralData.MS_VINCULACION_URL;
  token: string = "";

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.token = this.localStorageService.GetToken();
  }

  GetRecordList(): Observable<TypeVinculationModel[]> {
    return this.http.get<TypeVinculationModel[]>(`${this.url}/tipo-vinculacions`);
  }

  SaveRecord(data: TypeVinculationModel): Observable<TypeVinculationModel> {
    return this.http.post<TypeVinculationModel>(
      `${this.url}/tipo-vinculacions`,
      {
        name: data.nombre
      },
      {
        headers: new HttpHeaders({
          //Authorization: `Bearer ${this.token}`
        })
      });
  }

  SearchRecord(id: number): Observable<TypeVinculationModel>{
    return this.http.get<TypeVinculationModel>(`${this.url}/tipo-vinculacions/${id}`);
  }

  EditRecord(data: TypeVinculationModel): Observable<TypeVinculationModel> {
    return this.http.put<TypeVinculationModel>(
      `${this.url}/tipo-vinculacions/${data.id}`,
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
      `${this.url}/tipo-vinculacions/${id}`,
      {
        headers: new HttpHeaders({
          //Authorization: `Bearer ${this.token}`
        })
      });
  }

}
