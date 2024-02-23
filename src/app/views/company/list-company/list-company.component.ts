import { Component } from '@angular/core';
import { HttpRequest } from 'src/app/services/http-request.service';

@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrl: './list-company.component.scss'
})
export class ListCompanyComponent {
  public companyList: any = null;

  constructor(private httpRequest: HttpRequest) {
  }

  ngOnInit() {
    this.httpRequest.getCompanyDashboard().subscribe(res => 
      this.companyList = res 
    )
  }
}
