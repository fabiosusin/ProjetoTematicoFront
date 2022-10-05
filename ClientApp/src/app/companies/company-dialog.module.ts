import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '../core/modules/app-common.module';
import { AppMaterialModule } from '../core/modules/app-material.module';
import { CompanyDialog } from './components/edit/company.dialog';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    AppCommonModule
  ],
  exports: [CompanyDialog],
  declarations: [CompanyDialog],
  entryComponents: [CompanyDialog]
})
export class CompanyDialogPageModule { }
