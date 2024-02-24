import { Component, OnInit } from '@angular/core';
import { HttpRequest } from 'src/app/services/http-request.service';
import { getUserLogged } from 'src/app/utils';

@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrl: './list-company.component.scss'
})
export class ListCompanyComponent implements OnInit{
  private user = getUserLogged();

  public isLoading = false;
  public companyList: Array<any> = [];
  public maxLength = 0;
  public currentIndex = 0;

  constructor(private httpRequest: HttpRequest) {}

  ngOnInit() {
    this.isLoading = true;
    this.getCompanysUrls();
  }

  private getCompanysUrls() {
    this.httpRequest.getCompanyUrlById(this.user.company).subscribe(res => {
      this.companyList = res;
      this.isLoading = false;
      this.maxLength = res.length;
    });
  }

  next() {

    if (this.currentIndex + 1 === this.maxLength)
      return

    ++this.currentIndex
  }

  previous() {
    if (this.currentIndex <= 0)
      return

    --this.currentIndex;
  }
}
