import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../core/modules/app-material.module';
import { AppCommonModule } from '../core/modules/app-common.module';
import { InterviewRoutingModule } from './interview.routing';
import { InterviewDialog } from './components/edit/interview.dialog';
import { InterviewListPage } from './components/list/interview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InterviewRoutingModule,
    AppMaterialModule,
    AppCommonModule,
  ],
  exports: [InterviewDialog],
  declarations: [InterviewDialog, InterviewListPage],
  entryComponents: [InterviewDialog],
})
export class InterviewPageModule {}
