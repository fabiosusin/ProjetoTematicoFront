import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonPage } from './components/list/person.page';

const routes: Routes = [{ path: '', component: PersonPage }];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PersonRoutingModule { }
