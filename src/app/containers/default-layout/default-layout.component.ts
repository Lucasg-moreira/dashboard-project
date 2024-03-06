import { Component, OnInit } from '@angular/core';

import { navItems } from './_nav';
import { HttpRequest } from 'src/app/services/http-request.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

import { getUserLogged } from 'src/app/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})

export class DefaultLayoutComponent implements OnInit {
  public navItems = navItems;
  public dashboardItems: any = [];
  private user = getUserLogged();
  constructor(private httpRequestService: HttpRequest, private sharedDataService: SharedDataService, private router: Router) { }

  ngOnInit(): void {
    this.httpRequestService.getCompanyUrl().subscribe(res => {
      this.dashboardItems = res
        .filter((el: any) => this.user.company === el.idCompany)
        .map((el: any) =>
        ({ 
          id: el.id,
          idCompany: el.idCompany,
          name: el.nameDashboard,
          url: 'empresas/listar/' + el.id,
          urlCompany:el.urlCompany
        })
      );

      let i: number = this.navItems
        .findIndex((el: any) => el['name'] === 'Dashboards cadastrados');

      this.navItems[i].children = this.dashboardItems;
    });
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
