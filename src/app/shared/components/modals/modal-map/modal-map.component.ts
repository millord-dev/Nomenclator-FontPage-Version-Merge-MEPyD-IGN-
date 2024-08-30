import { Municipio } from './../../../models/Interfaces/municipio';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as L from 'leaflet';
import {Map, marker, tileLayer} from 'leaflet';
import { environment } from '../../../../../environments/environment';
import { Objeto } from 'src/app/shared/models/Interfaces/objeto';

@Component({
  selector: 'app-modal-map',
  templateUrl: './modal-map.component.html',
  styleUrls: ['./modal-map.component.scss']
})
export class ModalMapComponent implements OnInit {
  @Input() title;

  @Input() objeto: Objeto;
  constructor(public modal: NgbModal,  public dialogRef: MatDialogRef<ModalMapComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any) {
      this.title = modalData.title;
      this.objeto = modalData.objeto;
      if( this.objeto.coordenadasCount > 0){
        this.objeto.coordenadaUtmX= this.objeto.coordenadas[0].coordenadaUtmX,
        this.objeto.coordenadaUtmY= this.objeto.coordenadas[0].coordenadaUtmY,
        this.objeto.coordenadaGeoX= this.objeto.coordenadas[0].coordenadaGeoX,
        this.objeto.coordenadaGeoY=this.objeto.coordenadas[0].coordenadaGeoY

      }
    }
  ngOnInit(): void {
      this.cargarMapa()
    }
  cargarMapa(){
    const map = new Map('map').setView([Number( this.objeto.coordenadaGeoX), Number(this.objeto.coordenadaGeoY)], 7);
    map.panTo(new L.LatLng(Number(this.objeto.coordenadaGeoX),Number( this.objeto.coordenadaGeoY)));
    tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      id:'mapbox/streets-v11',
      accessToken: environment.mapbox.accessToken,
      attribution: '',
      tileSize: 512,
      zoomOffset: -1,
    }).addTo(map);

    marker([ Number(this.objeto.coordenadaGeoX), Number(this.objeto.coordenadaGeoY)])
    .addTo(map)
    .bindPopup(`<strong>Nombre geográfico:</strong> ${this.objeto.nombreGeografico} <br/>
    <strong>Nombre Local:</strong> ${this.objeto.nombreLocal} <br/>
    <strong>Región:</strong> ${this.objeto.nombreRegion} <br/>
    <strong>Provincia:</strong> ${this.objeto.nombreProvincia} <br/>
    <strong>Municipio:</strong> ${this.objeto.nombreMunicipio} <br/>
    <strong>Distrito municipal:</strong> ${this.objeto.nombreDistritoMunicipal} <br/>
    <strong>Clase : </strong> ${this.objeto.nombreClaseObjeto} <br/>
    <strong>Sub clase: </strong> ${this.objeto.nombreSubClaseObjeto} <br/>
    <strong>Latitud geo.:</strong> ${this.objeto.coordenadaGeoX} <br/>
    <strong>Longitud geo.:</strong> ${this.objeto.coordenadaGeoY}<br/>
    <strong>Latitud utm:</strong>  ${this.objeto.coordenadaUtmX} <br/>
    <strong>Longitud utm:</strong>  ${this.objeto.coordenadaUtmY} <br/>
    <strong>Area:</strong> ${this.objeto.area} <br/>
    <strong>Longitud:</strong> ${this.objeto.longitud} <br/>
    <strong>Altitud:</strong> ${this.objeto.altitud} <br/>
   `)


  }

}
