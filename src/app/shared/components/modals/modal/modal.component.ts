import { Objeto } from 'src/app/shared/models/Interfaces/objeto';

import { Component, EventEmitter, Inject, Input, OnInit, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ParametroService } from 'src/app/services/parametros.service';
import { enumParametro } from 'src/app/shared/utilidades/utilidades';
import { Parametro } from 'src/app/shared/models/Interfaces/parametros';
import { ObjetoService } from 'src/app/services/objecto.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit {
  modalReference: NgbModalRef;

  @Input() title;
  @Input() objeto: Objeto;
  listadoNombresHistoricos: any[];
  listadoNombresLocales: any[];
  listadoPoblaciones: any[];
  listadoCoordenadas: any[];
  existeCoordenadas: boolean;
  existePoblacion: boolean;
  existeNombresLocales: boolean;
  existeNombresHistoricos: boolean;
  public parametroEstatusDistritoMunicipal:Boolean;
  public parametroEstatusSeccion:Boolean;
  public parametroEstatusParaje:Boolean;
  public parametroEstatusBarrio:Boolean;
  public parametroEstatusSubbarrio:Boolean;
  constructor(public fb: FormBuilder,
     public dialogRef: MatDialogRef<ModalComponent>,
     private  objetoService:ObjetoService,
     private parametroService:ParametroService,
    @Inject(MAT_DIALOG_DATA) public modalData: any )
    {
      this.title =modalData.title;

         this.objetoService.getObjetoById(modalData.objeto.id).subscribe(
           (objeto:Objeto) => {
             this.objeto = objeto;

             this.objeto = modalData.objeto;
             if( this.objeto.coordenadasCount > 0){
               this.objeto.coordenadaUtmX= objeto.coordenadas[0].coordenadaUtmX,
               this.objeto.coordenadaUtmY= objeto.coordenadas[0].coordenadaUtmY,
               this.objeto.coordenadaGeoX= objeto.coordenadas[0].coordenadaGeoX,
               this.objeto.coordenadaGeoY=objeto.coordenadas[0].coordenadaGeoY

               }

           if(objeto.poblacionesCount > 0){
             this.existePoblacion=true
             this.listadoPoblaciones=objeto.poblaciones;
           }
           if(objeto.historialNombresLocalesCount > 0){
             this.existeNombresLocales=true
             this.listadoNombresLocales=objeto.historialNombresLocales;
           }
           if(this.objeto.historialNombresLocalesCount > 0){
             this.existeNombresHistoricos=true
             this.listadoNombresHistoricos=objeto.historialNombresHistoricos;
           }
             },
             (err: any) => {
             console.error(err);

        },
        () =>{

        }
      );

    }
  ngOnInit(): void {

  }
  parametrosDivisionTerritorial (){
    this.parametroService.getParametros().subscribe((data: Parametro[]) => {
    this.parametroEstatusDistritoMunicipal=data.find(entry => entry.id === enumParametro.distriMunicipal).estatus
    this.parametroEstatusSeccion=data.find(entry => entry.id === enumParametro.seccion).estatus
    this.parametroEstatusParaje=data.find(entry => entry.id === enumParametro.paraje).estatus
    this.parametroEstatusBarrio=data.find(entry => entry.id === enumParametro.barrio).estatus
    this.parametroEstatusSubbarrio=data.find(entry => entry.id === enumParametro.subbarrio).estatus

    });
  }
}
