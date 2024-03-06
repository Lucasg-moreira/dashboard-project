import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './create-company/company.component';
import { CompanyRoutingModule } from './company-routing.module'
import { AccordionModule, ButtonModule, CardModule, FormModule, GridModule, ListGroupModule, ModalModule, SharedModule, SpinnerModule, TableModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListCompanyComponent } from './list-company/list-company.component';

import { SafePipe } from './pipe-safe-url/safe-url.pipe';
import { NewCompanyComponent } from './create-company/new-company/new-company.component';
import { ListDashboardComponent } from './list-dashboard/list-dashboard.component';
@NgModule({
  declarations: [
    CompanyComponent,
    ListCompanyComponent,
    NewCompanyComponent,
    ListDashboardComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    CardModule,
    FormModule,
    ButtonModule,
    GridModule,
    IconModule,
    ReactiveFormsModule,
    FormsModule,
    SpinnerModule,
    ButtonModule,
    ModalModule,
    AccordionModule,
    ListGroupModule,
    SharedModule,
    TableModule
  ]
})

export class CompanyModule { }
