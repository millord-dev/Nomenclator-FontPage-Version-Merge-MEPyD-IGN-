import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AnexoGenerico } from '../shared/models/Interfaces/anexoGenerico';
import { Documento } from '../shared/models/Interfaces/documento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  _url = environment.apiUrl;
  _httpHeaders = new HttpHeaders().set('Type-content', 'aplication/json')
  constructor(private httpClient: HttpClient) { }

  getDocumento(): Observable<AnexoGenerico[]>{
    return this.httpClient.get<AnexoGenerico[]>(`${this._url}AnexoGenerico`,{ headers: this._httpHeaders });
  }
  GetPaginate( params: HttpParams): Observable<any>{
    let header = new HttpHeaders()
   .set('Type-content', 'aplication/json')
   return this.httpClient.get(`${this._url}AnexoGenerico/GetPaginate`, {params, headers: this._httpHeaders })
 }


  GetFilterPaginate( params: HttpParams): Observable<any>{
     let header = new HttpHeaders()
    .set('Type-content', 'aplication/json')
    return this.httpClient.get(`${this._url}AnexoGenerico/GetFilterPaginate`, {params, headers: this._httpHeaders })
  }

  getDocumentoById(Id: number): Observable<AnexoGenerico> {
    return this.httpClient.get<AnexoGenerico>(`${this._url}AnexoGenerico/${Id}`,{ headers: this._httpHeaders });
  }
}
