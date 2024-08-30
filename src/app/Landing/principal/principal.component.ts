
import { AnexoGenerico } from './../../shared/models/Interfaces/anexoGenerico';
import { ExcelService } from './../../services/excel.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {MatPaginator, MatPaginatorIntl, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableExporterDirective } from 'mat-table-exporter';

import { Municipio } from '../../shared/models/Interfaces/municipio';
import { Provincia } from '../../shared/models/Interfaces/provincia';
import { Region } from '../../shared/models/Interfaces/region';
import { Estados } from '../../shared/models/Interfaces/estado';
import { Data } from 'src/app/shared/models/Interfaces/data';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { ModalDocumentComponent } from 'src/app/shared/components/modals/modal-document/modal-document.component';
import { ImageFormComponent } from 'src/app/shared/components/modals/image-form/image-form.component';
import { DocumentoService } from 'src/app/services/documento.service';
import { SubClaseObjeto } from 'src/app/shared/models/Interfaces/SubClaseObjecto';
import { ClaseObjeto } from 'src/app/shared/models/Interfaces/claseObjeto';
import { DistritoMunicipal } from 'src/app/shared/models/Interfaces/distritoMunicipal';
import { ModalMapComponent } from 'src/app/shared/components/modals/modal-map/modal-map.component';
import { Image } from 'src/app/shared/models/Interfaces/image';
import { Filter } from 'src/app/shared/models/Interfaces/filters';
import { Objeto } from '../../shared/models/Interfaces/objeto';
import { enumEstado, enumTipoContenido, enumContenUser, enumParametrosSistema } from '../../shared/utilidades/utilidades';
import { ColumnMode, DatatableComponent, SortType } from '@swimlane/ngx-datatable';
import { Anexo } from 'src/app/shared/models/Interfaces/anexo';
import { AnexoService } from 'src/app/services/anexos.service';
import { ObjetoService } from 'src/app/services/objecto.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {provide: MatPaginatorIntl, useValue: CustomLabel()}
  ]
})

export class PrincipalComponent implements OnInit {
  @ViewChild(MatTableExporterDirective) matTableExporter: MatTableExporterDirective;
  @ViewChild('paginator_objetos') paginator_objetos: MatPaginator;
  @ViewChild('paginator_DocumentosGenericos') paginator_DocumentosGenericos: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isLoadingDocument:boolean;
  isLoading:boolean;
  reorderable: boolean = true;
  loading: boolean = false;
  listData: Objeto[] = [];
  listDocumento= [] as any;
  listClaseObjeto: ClaseObjeto[] = [];
  listSubClaseObjecto: SubClaseObjeto[] = [];
  listEstado: Estados[] = [];
  listRegion: Region[] = [];
  listProvincia: Provincia[] = [];
  listMunicipio: Municipio[] = [];
  listDistritoMunicipal: DistritoMunicipal[] = [];
  listDataComplet: object[] = [];
  listImage: Image[] = [];
  listDocumentGenerico: AnexoGenerico[] = [];
  listDocumentGenericoA: any = [];
  pr: Objeto[] = [];
  dataExcel: any = [];

  displayedColumns: string[] = [ 'NombreGeografico', 'nombreLocal',
  'ClaseObjetoGeografico', 'SubClaseGeografico', 'Region', 'Provincia', 'Municipio', 'Distrito Municipal', 'Acciones'];

  displayedColumnsDocument: string[] = [ 'Descripcion','Extension','TamanoConvertido' ,'Acciones'];

  dataSource: MatTableDataSource<any>;
  dataSourceDocument: MatTableDataSource<any>;

  public rows = [];
  public anexos: any=[];

  public rows_Documentos = [];

  limitSelected: any = 5;
  limitSelected1: any = 2;
  length_objetos :number;
  length_documentos :number;
  pageSize_objetos:number;
  pageSize_documentos:number;
  pageSizeOptions_objetos: number[] = [5, 10, 25, 100];
  pageSizeOptions_documentos: number[] = [5, 10, 25, 100];
  pageIndex_objetos :number;
  page = {
    limit: this.limitSelected,
    count: 0,
    offset: 0
  }
  pagePagination: PageEvent =
  {
    pageIndex:0,
    pageSize: 1,
    length: this.page.limit
  };

  page1 = {
    limit: this.limitSelected1,
    count: 0,
    offset: 0
  }
  limitSelect: any = [
    { value: 10, label: "10 Registros por página" },
    { value: 25, label: "25 Registros por página" },
    { value: 50, label: "50 Registros por página" }
  ];


  TObjecto: ClaseObjeto[] = [];
  TSubObject: SubClaseObjeto[] = [];
  TRegion: Region[] = [];
  TProvincia: Provincia[] = [];
  TMunicipio: Municipio[] = [];
  TDistritoMunicipal: DistritoMunicipal[] = [];

  select: any = {
    "nombreGeografico":"",
    "nombreLocal":"",
    "regionId": "",
    "claseObjetoId": "",
    "subClaseObjetoId": "",
    "provinciaId":"" ,
    "municipioId": "",
    "distritoMunicipalId": "",
    "estadoId":"6", // estado compleatdo
    "estatus":"true",
    "borrado":"false",
    "OrderBy":""
  }

  defaultVal: string = '';
  title: string;
  content: string;

  constructor(
    private matDialog: MatDialog,
    private modalService: NgbModal,
    private documentoService: DocumentoService,
    private objetoService: ObjetoService,
    private anexoService: AnexoService,
    private getDataExcel: ExcelService,
    public sanitizer:DomSanitizer){
      this.loading = false;
    }

  ngOnInit(): void {
    this.objetoService.getParams(enumParametrosSistema.Contenido).subscribe(resp => {
      this.title = resp.valor1;
      this.content = resp.valor2;
    });
    this.loading = false;
      this.GetDataDropDown()
      this.reloadTable_Objetos(0);
      this.reloadTable_Documentos(0);
      this.loading = true;
  }

  async getFilters_objetos_Server(data:NgForm) {
    this.select = data;
    this.page.offset = 0;
    await this.reloadTable_Objetos(0);
  }

  async onSelectSubClaseObjecto(data) {
    this.TSubObject = await this.objetoService.getSubClaseObjecto().toPromise();
    this.TSubObject = this.TSubObject.filter((item)=> item.claseObjetoId == data);
  }

  async onSelectRegion(data){
    this.TProvincia = await this.objetoService.getProvincia().toPromise();
    this.TProvincia = this.TProvincia.filter((item)=> item.regionId == data);
  }

  async onSelectMunicipio(data){
    this.TMunicipio = await this.objetoService.getMunicipio().toPromise();
    this.TMunicipio = this.TMunicipio.filter((item)=> item.provinciaId == data);
  }

  async onSelectDistritoMunicipal(data){
    this.TDistritoMunicipal = await this.objetoService.getDistritoMunicipal().toPromise();
    this.TDistritoMunicipal = this.TDistritoMunicipal.filter((item)=> item.municipioId == data);
  }


  DataExcel(){
    this.dataExcel = this.dataSource.data.map((item: any) => {
      return {
        Codigo: item.codigo,
        CodigoOne:item.codigoOne,
        NombreGeografico: item.nombreGeografico,
        NombreLocal: item.nombreLocal,
        Historia:item.historia,
        Clase: item.nombreTipoObjeto,
        Subclase:item.nombreSubTipoObjeto,
        Region:item.nombreRegion,
        Provincia:item.nombreProvincia,
        Municipio:item.nombreMunicipio,
        DistritoMunicipal:item.nombreDistritoMunicipal,
        DescripcionDivisionPolitica:item.divisionPolitica,
        Seccion:item.nombreSeccion,
        Paraje:item.nombreParaje,
        Barrio:item.nombreBarrio,
        SubBarrio:item.nombreSubBarrio,
        CoordenadaUtmX:item.coordenadaUtmX,
        CoordenadaUtmY:item.CoordenadaUtmY,
        CoordenadaGeoX:item.coordenadaGeoX,
        CoordenadaGeoY:item.coordenadaGeoY,
        DivisionPolitica:item.divisionPolitica,
        Area:item.area,
        Altitud:item.altitud,
        Longitud:item.longitud,
        NumeroSerie:item.numeroSerie,
        BaseLegal:item.baseLegal,
        Ficha:item.ficha,
        LinkFicha:item.linkFicha,


      };

    });
    this.getDataExcel.exportAsExcelFile(this.dataExcel, 'Lista de objetos geográficos')
  }

  refreshData(){
    this.reloadTable_Objetos(this.pagePagination.pageIndex).finally(() =>{
      this.loading = true;
      this.dataExcel = this.dataSource.data;
    });
    this.reloadTable_Documentos(this.pagePagination.pageIndex);
  }

  paginator(event: PageEvent){
    this.pagePagination = event;
    this.refreshData();
  }

  Clear(){
    this.select.claseObjetoId = this.defaultVal;
    this.select.subClaseObjetoId = this.defaultVal;
    this.select.regionId = this.defaultVal;
    this.select.provinciaId = this.defaultVal;
    this.select.municipioId = this.defaultVal;
    this.select.distritoMunicipalId = this.defaultVal;

    this.dataSource = new MatTableDataSource(this.rows);;

    this.dataSourceDocument = new MatTableDataSource(this.rows_Documentos);

    this.dataSource.paginator = this.paginator_objetos;
    this.dataSource.sort = this.sort;
    this.dataSourceDocument.paginator = this.paginator_DocumentosGenericos;
    this.dataSourceDocument.sort = this.sort;
  }

  async GetDataDropDown(){
    this.listClaseObjeto = await this.objetoService.getClaseObjecto().toPromise()
    this.TObjecto = this.listClaseObjeto;
    this.listSubClaseObjecto = await this.objetoService.getSubClaseObjecto().toPromise()
    this.listEstado = await this.objetoService.getEstados().toPromise()
    this.listRegion = await this.objetoService.getRegion().toPromise()
    this.TRegion = this.listRegion;
    this.listProvincia = await this.objetoService.getProvincia().toPromise()
    this.listMunicipio = await this.objetoService.getMunicipio().toPromise()
    this.listDistritoMunicipal = await this.objetoService.getDistritoMunicipal().toPromise()

  }

  async reloadTable_Objetos(offset:any) {
    this.isLoading = true;
    const params = new HttpParams()
      .set('page', `${offset + 1}`)
      .set('take', `${this.page.limit}`)
      .set('nombreGeografico',this.select.nombreGeografico)
      .set('nombreLocal', this.select.nombreLocal)
      .set('claseObjetoId', this.select.claseObjetoId)
      .set('subClaseObjetoId', this.select.subClaseObjetoId)
      .set('regionId', this.select.regionId)
      .set('provinciaId', this.select.provinciaId)
      .set('municipioId', this.select.municipioId)
      .set('distritoMunicipalId', this.select.distritoMunicipalId)
      .set('estadoId', 6)
    this.objetoService.GetPaginate(params).subscribe((data: any) => {

      this.rows = data.items;
      this.length_objetos = data.total;
      this.dataSource = new MatTableDataSource(this.rows);
      this.isLoading = false;
      // this.dataSource.paginator = this.paginator_objetos;
      // this.dataSource.sort = this.sort;

    });
  }
  async reloadTable_Documentos(offset:any){
    this.isLoadingDocument = true;
    const params = new HttpParams()
    .set('page', `${offset + 1}`)
    .set('take', `${this.page1.limit}`)
    .set('id', "")
    .set('nombre', "")
    .set('tipoContenidoId', "")
    .set('estatus',"true")
    .set('borrado', "false")

    this.documentoService.GetPaginate(params).subscribe((data: any) => {
    this.rows_Documentos=data.items;
    this.length_documentos = data.total;
    this.dataSourceDocument = new MatTableDataSource(this.rows_Documentos);
    this.isLoadingDocument = false;
  });

  }
  openDetalle(objeto: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";

    dialogConfig.width = "650px";
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: `Datos del objeto: ${objeto.nombreGeografico}`,
      objeto:objeto
    }

    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }

  openDocument(objeto: any){
    this.anexoService.getDocumentoByObjetoId(objeto.id).subscribe(
      (anexo: Anexo[]) => {
        this.anexos=[]=anexo
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.id = "modal-document-component";
        dialogConfig.maxHeight = "400px";
        dialogConfig.width = "700px";
        dialogConfig.autoFocus = true;
        dialogConfig.data= anexo
        dialogConfig.data = {
        title: `Documentos del objeto: ${objeto.nombreGeografico}`,
        anexos:anexo
         }
    const modalDialog = this.matDialog.open(ModalDocumentComponent, dialogConfig);
      },
      (err: any) => {
        console.error(err);
        document.body.click();
      },
      () => {
        document.body.click();
      }
    );

  }

  openImage(objeto: any){
      this.anexoService.getImagenByObjetoId(objeto.id).subscribe(
        (anexo: Anexo[]) => {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;
          dialogConfig.id = "modal-image-component";
          dialogConfig.maxHeight  = "650px";
          dialogConfig.width = "1000px";
          dialogConfig.autoFocus = true;
          dialogConfig.data = {
          title: `Imagen del objeto: ${objeto.nombreGeografico}`,
          anexos:anexo
        }
          const modalDialog = this.matDialog.open(ImageFormComponent, dialogConfig);
        },
        (err: any) => {
          console.error(err);
          document.body.click();
        },
        () => {
          document.body.click();
        }
      );
  }

  openMap(objeto: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-map-component";
    dialogConfig.width = "1200px";
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: `Mapa del objeto: ${objeto.nombreGeografico}`,
      objeto:objeto
    }
    const modalDialog = this.matDialog.open(ModalMapComponent, dialogConfig);
  }

  DescargarDocumentos(id) {
    if (id >= 0) {

      this.documentoService.getDocumentoById(id).subscribe(
        (anexo: AnexoGenerico) => {
          anexo.url=this.sanitizer.bypassSecurityTrustResourceUrl(anexo.archivo);
          var a = document.createElement("a");
          a.href = anexo.archivo;
          a.download = anexo.nombreArchivo;
          a.click();
        },
        (err: any) => {
          console.error(err);

          document.body.click();
        },
        () => {
          document.body.click();
        }
      );

    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterDocument(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceDocument.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceDocument.paginator) {
      this.dataSourceDocument.paginator.firstPage();
    }
  }

}

function CustomLabel(){
  const customLabel = new MatPaginatorIntl();
  customLabel.itemsPerPageLabel = 'Resultados por página:';
  return customLabel;
}
