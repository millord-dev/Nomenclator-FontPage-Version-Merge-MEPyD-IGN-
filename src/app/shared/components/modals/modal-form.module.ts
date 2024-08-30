import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFormRoutingModule } from './modal-form-routing.module';
import { ModalComponent } from './modal/modal.component';
import { SharedModule } from '../../shared.module';
import { ModalDocumentComponent } from './modal-document/modal-document.component';
import { ImageFormComponent } from './image-form/image-form.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatCarouselModule } from '@ngbmodule/material-carousel';
import { ModalMapComponent } from './modal-map/modal-map.component';

@NgModule({
  declarations: [
    ModalComponent,
    ModalDocumentComponent,
    ImageFormComponent,
    ModalMapComponent
  ],
  imports: [
    CommonModule,
    ModalFormRoutingModule,
    SharedModule,
    MDBBootstrapModule.forRoot(),
    MatCarouselModule.forRoot()

  ],
  exports:[ModalComponent, ModalDocumentComponent, ImageFormComponent]
})
export class ModalFormModule { }
