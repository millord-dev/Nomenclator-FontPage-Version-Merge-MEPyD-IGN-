import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Parametro } from '../shared/models/Interfaces/parametros';
@Injectable({
    providedIn: 'root'
  })
  export class ParametroService {
    _url = environment.apiUrl + "Parametro";
    constructor(private httpClient: HttpClient) {
    }


  getParametros(): Observable<Parametro[]> {
    let header = new HttpHeaders()
    .set('Type-content', 'aplication/json')
    return this.httpClient.get<Parametro[]>(this._url);
  }

  getParametroById(Id: number): Observable<Parametro> {

    return this.httpClient.get<Parametro>(`${this._url}/${Id}`);

  }
}
