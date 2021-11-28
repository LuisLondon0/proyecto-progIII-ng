import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Session } from 'inspector';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionData } from 'src/app/models/session-data.model';
import { GeneralData } from '../../config/general-data';
import { UserCredentialsModel } from '../../models/user-credencials.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
sessionDataSubject: BehaviorSubject<SessionData> = new BehaviorSubject<SessionData>(new SessionData())
   
url: string= GeneralData.ADMIN_USERS_URL
  constructor(
    private http: HttpClient
  ) {
    this.IsThereActiveSession()
   }

  IsThereActiveSession() {
    let data = localStorage.getItem("session-data");
    if (data) {
      let objectData: SessionData = JSON.parse(data);
      objectData.isLoggedIn = true;
      this.RefreshSessionData(objectData);
    }
  }

  RefreshSessionData(data: SessionData){
    this.sessionDataSubject.next(data);
  }

  GetSessionStatus(){
    return this.sessionDataSubject.asObservable();
  }

  Login(model: UserCredentialsModel): Observable<any>{
  return this.http.post<SessionData>(`${this.url}/reconocer-usuario`,{
    usuario: model.username,
    clave: model.password
  })
}
}
