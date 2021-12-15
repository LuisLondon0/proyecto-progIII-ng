import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { LineOfResearchModel } from 'src/app/models/parameters/line-of-research.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LineOfResearchService {
  url: string = GeneralData.MS_JURY_URL;
  token: string = "";

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.token = this.localStorageService.GetToken();
   }

  GetRecordList(): Observable<LineOfResearchModel[]>{
    return this.http.get<LineOfResearchModel[]>(`${this.url}/linea-investigacions`)
  }

  SaveRecord(data: LineOfResearchModel): Observable<LineOfResearchModel>{
    return this.http.post<LineOfResearchModel>(`${this.url}/linea-investigacions`, {
      nombre: data.nombre,
    },
    {headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })})
  }

  SearchRecord(id: number): Observable<LineOfResearchModel>{
    return this.http.get<LineOfResearchModel>(`${this.url}/linea-investigacions/${id}`);
  }

  EditRecord(data: LineOfResearchModel): Observable<LineOfResearchModel>{
    return this.http.put<LineOfResearchModel>(`${this.url}/linea-investigacions/${data.id}`, {
      id: data.id,
      nombre: data.nombre,
    },
    {headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })})
  }

  RemoveRecord(id: number): Observable<any>{
    return this.http.delete<LineOfResearchModel>(`${this.url}/linea-investigacions/${id}`,
    {headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })})
  }
}