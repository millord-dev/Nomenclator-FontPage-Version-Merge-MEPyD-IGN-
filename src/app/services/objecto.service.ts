import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Region } from '../shared/models/Interfaces/region';
import { Provincia } from '../shared/models/Interfaces/provincia';
import { Parametros } from '../shared/models/Interfaces/parametro';
import { DistritoMunicipal } from './../shared/models/Interfaces/distritoMunicipal';
import { Municipio } from './../shared/models/Interfaces/municipio';
import { SubClaseObjeto } from 'src/app/shared/models/Interfaces/SubClaseObjecto';
import { ClaseObjeto } from '../shared/models/Interfaces/claseObjeto';
import { Estados } from '../shared/models/Interfaces/estado';
import { Objeto } from '../shared/models/Interfaces/objeto';


@Injectable({
  providedIn: 'root'
})
export class ObjetoService {
  _url = environment.apiUrl;
  _httpHeaders = new HttpHeaders().set('Type-content', 'aplication/json')
  constructor(private httpClient: HttpClient) {
  }

  getObjecto(): Observable<Objeto[]>{
    return this.httpClient.get<Objeto[]>(`${this._url}Objeto`,{ headers: this._httpHeaders });
  }
  getObjetoById(id: number): Observable<Objeto> {
    return this.httpClient.get<Objeto>(`${this._url}Objeto/${id}`,{ headers: this._httpHeaders });
  }

  getClaseObjecto(): Observable<ClaseObjeto[]>{
    return this.httpClient.get<ClaseObjeto[]>(`${this._url}ClaseObjeto`,{ headers: this._httpHeaders });
  }
  getSubClaseObjecto(): Observable<SubClaseObjeto[]>{
    return this.httpClient.get<SubClaseObjeto[]>(`${this._url}SubClaseObjeto`,{ headers: this._httpHeaders });
  }

  getEstados(): Observable<Estados[]>{
    return this.httpClient.get<Estados[]>(`${this._url}Estado`,{ headers: this._httpHeaders });
  }

  getRegion(): Observable<Region[]>{
    return this.httpClient.get<Region[]>(`${this._url}Region`,{ headers: this._httpHeaders });
  }

  getProvincia(): Observable<Provincia[]>{
    return this.httpClient.get<Provincia[]>(`${this._url}Provincia`,{ headers: this._httpHeaders });
  }

  getMunicipio(): Observable<Municipio[]>{
    return this.httpClient.get<Municipio[]>(`${this._url}Municipio`,{ headers: this._httpHeaders });
  }

  getDistritoMunicipal(): Observable<DistritoMunicipal[]>{
    return this.httpClient.get<DistritoMunicipal[]>(`${this._url}DistritoMunicipal`,{ headers: this._httpHeaders });
  }

  GetPaginate( params: HttpParams): Observable<any>{
    return this.httpClient.get(`${this._url}Objeto/GetPaginate`, {params,headers: this._httpHeaders})
  }
  GetFilterPaginate( params: HttpParams): Observable<any>{
    return this.httpClient.get(`${this._url}Objeto/GetFilterPaginate`, {params,headers: this._httpHeaders})
  }
  getParams(id:number):Observable<Parametros>{
    return this.httpClient.get<Parametros>(`${this._url}Parametro/${id}`,{ headers: this._httpHeaders });
  }
}
