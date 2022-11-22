import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../core/modules/app-material.module';
import { AppCommonModule } from '../core/modules/app-common.module';
import { FrequencyDialog } from './components/edit/frequency.dialog';
import { FrequencyRoutingModule } from './frequency.routing';
import { FrequencyListPage } from './components/list/frequency.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FrequencyRoutingModule,
    AppMaterialModule,
    AppCommonModule
  ],
  exports: [FrequencyDialog],
  declarations: [FrequencyDialog, FrequencyListPage],
  entryComponents: [FrequencyDialog]
})
export class FrequencyPageModule { }
