import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Anexo } from '../../../models/Interfaces/anexo';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.scss']
})
export class ImageFormComponent implements OnInit {

  @Input() title;
  @Input() anexos: Anexo[] = [];
  constructor(public fb: FormBuilder,public modal: NgbModal,  public dialogRef: MatDialogRef<ImageFormComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,private sanitizer:DomSanitizer) {

      this.title =modalData.title;
      this.anexos = modalData.anexos;
      this.anexos.map( (o)=> o.url=this.sanitizer.bypassSecurityTrustResourceUrl(o.archivo) );
    }

  ngOnInit(): void {

  }

}
