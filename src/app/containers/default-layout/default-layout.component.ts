import { Component, OnInit } from '@angular/core';

import { navItems } from './_nav';
import { HttpRequest } from 'src/app/services/http-request.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

import { getUserLogged } from 'src/app/utils';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})

export class DefaultLayoutComponent implements OnInit {
  public navItems = navItems;
  public dashboardItems: any = [];
  private user = getUserLogged();

  constructor(
    private httpRequestService: HttpRequest, 
    private sharedDataService: SharedDataService, 
    private router: Router,
    private alert: MatSnackBar) { }

  ngOnInit(): void {
    this.navItems[2].children = [];

    this.httpRequestService.getCompanyUrl().subscribe(res => {
      if (this.user.isAdmin) {
        this.dashboardItems = res.map(this.hydrateDashboard);
      }
      else {
        this.dashboardItems = res
          .filter((el: any) => this.user.company === el.idCompany)
          .map(this.hydrateDashboard)
      }

      if (!this.dashboardItems.length) {
        delete this.navItems[2].url;
        this.alert.open('Ainda não há itens no seu dashboard! Peça para um administrador cadastrar.', 'Close', {
          duration: 8000
        });
        return
      }

      this.navItems[2].children = this.dashboardItems;
    });
  }

  private hydrateDashboard(element: any) {
    return { 
      id: element.id,
      idCompany: element.idCompany,
      name: element.nameDashboard,
      url: 'empresas/listar/' + element.id,
      urlCompany: element.urlCompany
    }
  }

  selectDashboard(e: any) {
    const dashboardSelected = this.dashboardItems
      .find((el: any) => el.name === e.target.outerText);
    
    if (!dashboardSelected)
      return;

    this.sharedDataService.data = dashboardSelected;
    this.router.navigate([`empresas/listar/${dashboardSelected.id}`], { skipLocationChange: true })
  }
}
