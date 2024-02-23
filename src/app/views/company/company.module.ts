import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './create-company/company.component';
import { CompanyRoutingModule } from './company-routing.module'
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ListCompanyComponent } from './list-company/list-company.component';

@NgModule({
  declarations: [
    CompanyComponent,
    ListCompanyComponent
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
  ]
})

export class CompanyModule { }
