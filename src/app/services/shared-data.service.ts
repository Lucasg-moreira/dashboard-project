import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private _data: any = [];

  constructor() { }

  public set data(arr: any) {
    this._data = arr;
  }

  public get data() {
    return this._data;
  }
}
