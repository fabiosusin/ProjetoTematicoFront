import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterviewListPage } from './components/list/interview.page';

const routes: Routes = [{ path: '', component: InterviewListPage }];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class InterviewRoutingModule { }
