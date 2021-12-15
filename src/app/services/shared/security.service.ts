import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Session } from 'inspector';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionData } from 'src/app/models/session-data.model';
import { GeneralData } from '../../config/general-data';
import { UserCredentialsModel, UserCredentialsModelChange, UserCredentialsModelPass } from '../../models/user-credencials.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  sessionDataSubject: BehaviorSubject<SessionData> = new BehaviorSubject<SessionData>(new SessionData())

  url: string = GeneralData.ADMIN_USERS_URL
  urlJ: string = GeneralData.JURY_USERS_URL
  token: string = ""
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.IsThereActiveSession()
    this.token = this.localStorageService.GetToken();
  }

  IsThereActiveSession() {
    let data = localStorage.getItem("session-data");
    if (data) {
      let objectData: SessionData = JSON.parse(data);
      objectData.isLoggedIn = true;
      this.RefreshSessionData(objectData);
    }
  }

  RefreshSessionData(data: SessionData) {
    this.sessionDataSubject.next(data);
  }

  GetSessionStatus() {
    return this.sessionDataSubject.asObservable();
  }

  Login(model: UserCredentialsModel): Observable<any> {
    return this.http.post<SessionData>(`${this.url}/reconocer-usuario`, {
      usuario: model.username,
      clave: model.password
    })
  }
  LoginJ(model: UserCredentialsModel): Observable<any> {
    return this.http.post<SessionData>(`${this.urlJ}/reconocer-usuario`, {
      usuario: model.username,
      clave: model.password
    })
  }

  ResetPassword(model: UserCredentialsModelPass): Observable<any> {
    return this.http.post(`${this.url}/recuperar-clave`, {
      correo: model.correo

    })
  }

  ResetPasswordJ(model: UserCredentialsModelPass): Observable<any> {
    return this.http.post(`${this.urlJ}/recuperar-clave`, {
      correo: model.correo

    })
  }


  ChangePassword(model: UserCredentialsModelChange): Observable<any> {
    return this.http.post(`${this.url}/cambiar-clave`, {
      id_usuario: model.id_usuario,
      clave_actual: model.clave_actual,
      nueva_clave: model.nueva_clave

    },
    {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    })
  }
  ChangePasswordJ(model: UserCredentialsModelChange): Observable<any> {
    return this.http.post(`${this.urlJ}/cambiar-clave`, {
      id_usuario: model.idusuario,
      clave_actual: model.clave_actual,
      nueva_clave: model.nueva_clave

    },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      })
  }


}
