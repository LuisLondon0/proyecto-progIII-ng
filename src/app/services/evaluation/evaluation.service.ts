import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { EvaluationModel } from 'src/app/models/evaluation/evaluation.model';
import { CommitteeModel } from 'src/app/models/parameters/committee.model';
import { JuryModel } from 'src/app/models/parameters/jury.model';
import { UploadedFileModel } from 'src/app/models/uploaded.file.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  url: string = GeneralData.MS_REQUEST_URL;
  url2: string = GeneralData.MS_JURY_URL;
  token: string = "";
  filter: string = `?filter={"include":[{"relation":"solicitud"}]}`;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.token = this.localStorageService.GetToken();
  }

  GetRecordList(): Observable<EvaluationModel[]> {
    return this.http.get<EvaluationModel[]>(`${this.url}/evaluacion-solicitudes${this.filter}`)
  }

  GetJury(id: number): Observable<JuryModel> {
    return this.http.get<JuryModel>(`${this.url2}/jurados/${id}`)
  }

  SaveRecord(data: EvaluationModel): Observable<EvaluationModel> {
    return this.http.post<EvaluationModel>(`${this.url}/evaluacion-solicitudes`, {
      solicitudId: data.solicitudId,
      juradoId: data.juradoId,
      fechaInvitacion: data.fechaInvitacion,
    },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      })
  }

  SearchRecord(id: number): Observable<EvaluationModel> {
    return this.http.get<EvaluationModel>(`${this.url}/evaluacion-solicitudes/${id}`);
  }

  RemoveRecord(id: number): Observable<any> {
    return this.http.delete<EvaluationModel>(`${this.url}/evaluacion-solicitudes/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      })
  }

  AceptarRechazar(data: EvaluationModel): Observable<EvaluationModel> {
    return this.http.post<EvaluationModel>(`${this.url}/aceptar-rechazar-solicitud`, {
      id: data.id,
      respuesta: data.respuesta,
      observaciones: data.observaciones,
      fecha: data.fechaRespuesta,
    },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      })
  }
}
