import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrequencyListPage } from './components/list/frequency.page';

const routes: Routes = [{ path: '', component: FrequencyListPage }];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FrequencyRoutingModule { }
