import { Injectable } from '@angular/core';
import { SessionData } from 'src/app/models/session-data.model';
import { UserData } from 'src/app/models/user-data.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  
  constructor() { }

  SaveSessionData(data: SessionData): boolean{
    let saved = localStorage.getItem("session-data");
    if(saved){
      return false;
    }else{
      let stringData = JSON.stringify(data);
      localStorage.setItem("session-data", stringData);
      return true;
    }
  }

  RemoveSessionData(){
    localStorage.removeItem("session-data");
  }

  GetToken(): string{
    let saved = localStorage.getItem("session-data");
    if(saved){
      let data = JSON.parse(saved);
      return data.token;
    }
    return "";
  }
  GetUser(): UserData{
    let saved = localStorage.getItem("session-data");
    let aux = new UserData
    if(saved){
      let data = JSON.parse(saved);
      return data.usuario;
    }
    return aux
  }
}
