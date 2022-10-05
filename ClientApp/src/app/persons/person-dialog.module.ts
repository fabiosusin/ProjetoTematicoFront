import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '../core/modules/app-common.module';
import { AppMaterialModule } from '../core/modules/app-material.module';
import { PersonDialog } from './components/edit/person.dialog';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    AppCommonModule
  ],
  exports: [PersonDialog],
  declarations: [PersonDialog],
  entryComponents: [PersonDialog]
})
export class PersonDialogPageModule { }
