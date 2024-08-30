import { Component, Inject, Input, OnInit, Pipe, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer,SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { Anexo } from '../../../models/Interfaces/anexo';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableExporterDirective } from 'mat-table-exporter';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-modal-document',
  templateUrl: './modal-document.component.html',
  styleUrls: ['./modal-document.component.scss']
})

export class ModalDocumentComponent implements OnInit {
  @ViewChild(MatTableExporterDirective) matTableExporter: MatTableExporterDirective;
  @ViewChild('paginator_DocumentosGenericos') paginator_DocumentosGenericos: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSourceDocument: MatTableDataSource<any>;
  displayedColumnsDocument: string[] = [ 'Descripcion','Extension','TamanoConvertido' ,'Acciones'];

  @Input() modalbody : TemplateRef<any>;
  @Input() title;
  @Input() anexos: Anexo[] = [];
  @Pipe({name: 'secureUrl'})

  modalReference: NgbModalRef;
  form: FormGroup;

  alert: boolean = false;
  public sanitizerurl :DomSanitizer

  constructor(public fb: FormBuilder,public modal: NgbModal,  public dialogRef: MatDialogRef<ModalDocumentComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any, private sanitizer:DomSanitizer) {
      this.title =modalData.title,
      this.sanitizerurl=sanitizer
      //this.anexos = modalData.anexos.map((o)=> o.url=this.sanitizer.bypassSecurityTrustResourceUrl(o.archivo) );
      this.anexos = modalData.anexos;

      this.dataSourceDocument = new MatTableDataSource(this.anexos);
      this.dataSourceDocument.paginator = this.paginator_DocumentosGenericos;
      this.dataSourceDocument.sort = this.sort;
    }

  ngOnInit(): void {
  }

}
