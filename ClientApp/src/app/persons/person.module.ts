import { AppCommonModule } from '../core/modules/app-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../core/modules/app-material.module';
import { PersonPage } from './components/list/person.page';
import { PersonDialogPageModule } from './person-dialog.module';
import { PersonRoutingModule } from './person.routing';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PersonRoutingModule,
    AppMaterialModule,
    AppCommonModule,
    PersonDialogPageModule
  ],
  declarations: [PersonPage]
})
export class PersonPageModule { }
