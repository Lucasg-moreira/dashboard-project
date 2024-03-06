import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-list-dashboard',
  templateUrl: './list-dashboard.component.html',
  styleUrl: './list-dashboard.component.scss'
})
export class ListDashboardComponent implements DoCheck {
  public dashboard: any = this.sharedDataService.data;
  public isLoading = false;
  public currentIndex: number = 1;

  constructor(
    private sharedDataService: SharedDataService, 
    private route: ActivatedRoute) {
  }

  ngDoCheck () {
    if (this.dashboard !== this.sharedDataService.data) {
      this.isLoading = true;
      this.dashboard = this.sharedDataService.data;
      this.isLoading = false;
    }
  }
}
