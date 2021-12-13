import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { JuryModel } from 'src/app/models/parameters/jury.model';
import { LineOfResearchModel } from 'src/app/models/parameters/line-of-research.model';
import { UploadedFileModel } from 'src/app/models/uploaded.file.model';

@Injectable({
  providedIn: 'root'
})
export class JuryService {
  url: string = GeneralData.MS_JURY_URL;
  token: string = "";
  filter: string = `?filter={"include":[{"relation":"lineaInvestigacions"}]}`;

  constructor(
    private http: HttpClient
    //private localStorageService: LocalStorageService
  ) {
    //this.token = this.localStorageService.GetToken();
  }

  GetRecordList(): Observable<JuryModel[]> {
    return this.http.get<JuryModel[]>(`${this.url}/jurados${this.filter}`);
  }

  GetLineasInvestigacion(id: number): Observable<LineOfResearchModel[]> {
    return this.http.get<LineOfResearchModel[]>(`${this.url}/jurados/${id}/linea-investigacions`)
  }

  SaveRecord(data: JuryModel): Observable<JuryModel> {
    return this.http.post<JuryModel>(
      `${this.url}/jurados`, {
      nombre: data.nombre,
      apellidos: data.apellidos,
      correo: data.correo,
      entidad: data.entidad,
      telefono: data.telefono,
    },
      {
        headers: new HttpHeaders({
          //Authorization: `Bearer ${this.token}`
        })
      });
  }

  SaveLinesOfResearch(id: number, data: number[]): Observable<boolean> {
    return this.http.post<boolean>(`${this.url}/relacionar-jurados-linea-investigacions/${id}`, {
      lineas_investigacion: data,
    },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      })
  }

  SearchRecord(id: number): Observable<JuryModel> {
    return this.http.get<JuryModel>(`${this.url}/jurados/${id}`);
  }

  EditRecord(data: JuryModel): Observable<JuryModel> {
    return this.http.put<JuryModel>(
      `${this.url}/jurados/${data.id}`,
      {
        id: data.id,
        nombre: data.nombre,
        apellidos: data.apellidos,
        correo: data.correo,
        entidad: data.entidad,
        telefono: data.telefono,
      },
      {
        headers: new HttpHeaders({
          //Authorization: `Bearer ${this.token}`
        })
      });
  }

  RemoveRecord(id: number): Observable<any> {
    return this.http.delete(
      `${this.url}/jurados/${id}`,
      {
        headers: new HttpHeaders({
          //Authorization: `Bearer ${this.token}`
        })
      });
  }
}