import { AppCommonModule } from '../core/modules/app-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../core/modules/app-material.module';
import { CompanyPage } from './components/list/company.page';
import { CompanyDialogPageModule } from './company-dialog.module';
import { CompanyRoutingModule } from './company.routing';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CompanyRoutingModule,
    AppMaterialModule,
    AppCommonModule,
    CompanyDialogPageModule
  ],
  declarations: [CompanyPage]
})
export class CompanyPageModule { }
