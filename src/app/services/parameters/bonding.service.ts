import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { BondingModel } from 'src/app/models/parameters/bonding.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BondingService {
  url: string = GeneralData.MS_BONDING_URL;
  token: string = "";

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.token = this.localStorageService.GetToken();
   }

  GetRecordList(): Observable<BondingModel[]>{
    return this.http.get<BondingModel[]>(`${this.url}/tipo-vinculacions`)
  }

  SaveRecord(data: BondingModel): Observable<BondingModel>{
    return this.http.post<BondingModel>(`${this.url}/tipo-vinculacions`, {
      nombre: data.nombre,
    },
    {headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })})
  }

  SearchRecord(id: number): Observable<BondingModel>{
    return this.http.get<BondingModel>(`${this.url}/tipo-vinculacions/${id}`);
  }

  EditRecord(data: BondingModel): Observable<BondingModel>{
    return this.http.put<BondingModel>(`${this.url}/tipo-vinculacions/${data.id}`, {
      id: data.id,
      nombre: data.nombre,
    },
    {headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })})
  }

  RemoveRecord(id: number): Observable<any>{
    return this.http.delete<BondingModel>(`${this.url}/tipo-vinculacions/${id}`,
    {headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })})
  }
}