import { Component } from '@angular/core';
import { HttpRequest } from 'src/app/services/http-request.service';

@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrl: './list-company.component.scss'
})
export class ListCompanyComponent {
  public isLoading = false;
  public companyList: Array<any> = [];
  public maxLength = 0;
  public currentIndex = 0;
  public currentUrl = '';

  constructor(private httpRequest: HttpRequest) {}

  ngOnInit() {
    this.isLoading = true;

    this.httpRequest.getCompanys().subscribe(res => {
      this.companyList = res;
      this.maxLength = this.companyList.length;
      this.isLoading = false;
    })
  }

  onItemChange(event: any) {
    console.log(event);
  }

  next() {
    this.currentUrl = this.companyList[this.currentIndex++].urlCompany
  }

  previous() {
    this.currentUrl = this.companyList[this.currentIndex--].urlCompany
  }
}
