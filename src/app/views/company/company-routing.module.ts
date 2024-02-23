import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './create-company/company.component';
import { ListCompanyComponent } from './list-company/list-company.component';

const routes: Routes = [
  {
    path: 'criar',
    component: CompanyComponent,
    data: {
      title: 'Cadastro de empresas'
    }
  },
  {
    path: 'listar',
    component: ListCompanyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule {
}
