import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { UserData } from 'src/app/models/user-data.model';
import { LocalStorageService } from 'src/app/services/shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = GeneralData.ADMIN_USERS_URL;
  token: string = ""
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.token = this.localStorageService.GetToken();
   }

  GetRecordList(): Observable<UserData[]> {
    return this.http.get<UserData[]>(`${this.url}/usuarios`);
  }

  SaveRecord(data: UserData): Observable<UserData> {
    return this.http.post<UserData>(
      `${this.url}/usuarios`,
      {
        nombre: data.nombre,
        correo: data.correo,
        celular: data.celular,
        estado: data.estado,
        id_rol: data.id_rol
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }

  SearchRecord(id: string): Observable<UserData>{
    return this.http.get<UserData>(`${this.url}/usuarios/${id}`);
  }

  EditRecord(data: UserData): Observable<UserData> {
    return this.http.put<UserData>(
      `${this.url}/usuarios/${data._id}`,
      {
        _id: data._id,
        nombre: data.nombre,
        correo: data.correo,
        celular: data.celular,
        estado: data.estado,
        id_rol: data.id_rol
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }

  RemoveRecord(id: string): Observable<any>{
    return this.http.delete(
      `${this.url}/usuarios/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }

}
