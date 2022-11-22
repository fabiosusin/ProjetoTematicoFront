import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SituationListPage } from './components/list/situation.page';

const routes: Routes = [{ path: '', component: SituationListPage }];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SituationRoutingModule { }
