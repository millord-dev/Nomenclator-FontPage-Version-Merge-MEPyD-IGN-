import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Anexo } from '../shared/models/Interfaces/anexo';
@Injectable({
  providedIn: 'root'
})
export class AnexoService {
  _url = environment.apiUrl + "Anexo";
  constructor(private httpClient: HttpClient) {
  }
  getAnexos(): Observable<any>{
    let header = new HttpHeaders()
    .set('Type-content', 'aplication/json')
    return this.httpClient.get(`${this._url}`, {
/*       headers: header */
    });
  }
  getAnexoById(Id: number): Observable<any> {
    let header = new HttpHeaders()
    .set('Type-content', 'aplication/json')
    return this.httpClient.get<Anexo>(`${this._url}/${Id}`);
  }
  getDocumentoByObjetoId(ObjetoId: number): Observable<Anexo[]> {
    const httpHeaders = new HttpHeaders()
    .set('Type-content', 'aplication/json')
    return this.httpClient.get<Anexo[]>(`${this._url}/GetDocumentosByObjeto/` + ObjetoId,{ headers: httpHeaders });
  }
  getImagenByObjetoId(ObjetoId: number): Observable<Anexo[]> {
    const httpHeaders = new HttpHeaders()
    .set('Type-content', 'aplication/json')
    return this.httpClient.get<Anexo[]>(`${this._url}/GetImagenesByObjeto/`+ ObjetoId,{ headers: httpHeaders });
  }
}
