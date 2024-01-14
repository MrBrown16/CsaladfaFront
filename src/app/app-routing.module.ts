import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPeopleComponent } from './list-people/list-people.component';
import { NewPersonComponent } from './new-person/new-person.component';

const routes: Routes = [
  {path:"list-people", component:ListPeopleComponent},
  {path:"edit/:id", component:NewPersonComponent},
  {path:"edit", component:NewPersonComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
