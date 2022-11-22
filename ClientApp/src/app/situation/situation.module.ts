import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SituationRoutingModule } from './situation.routing';
import { AppMaterialModule } from '../core/modules/app-material.module';
import { AppCommonModule } from '../core/modules/app-common.module';
import { SituationDialog } from './components/edit/situation.dialog';
import { SituationListPage } from './components/list/situation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SituationRoutingModule,
    AppMaterialModule,
    AppCommonModule,
  ],
  exports: [SituationDialog],
  declarations: [SituationDialog, SituationListPage],
  entryComponents: [SituationDialog],
})
export class SituationPageModule {}
