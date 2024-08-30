import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalRoutingModule } from './principal-routing.module';
import { PrincipalComponent } from './principal.component';
import { SharedModule } from '../../shared/shared.module';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { ModalFormModule } from 'src/app/shared/components/modals/modal-form.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    PrincipalComponent,

  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    SharedModule,
    NgxDatatableModule

  ]
})
export class PrincipalModule { }
