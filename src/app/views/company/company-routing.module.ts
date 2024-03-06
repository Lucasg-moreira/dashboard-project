import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './create-company/company.component';
import { ListDashboardComponent } from './list-dashboard/list-dashboard.component';

const routes: Routes = [
  {
    path: 'criar',
    component: CompanyComponent,
    data: {
      title: 'Cadastro de empresas'
    }
  },
  {
    path: 'listar/:id',
    component: ListDashboardComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule {
}
