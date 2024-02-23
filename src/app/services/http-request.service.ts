import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getMultipleValuesInSingleSelectionError } from '@angular/cdk/collections';

@Injectable({
  providedIn: 'root'
})
export class HttpRequest {
  private baseUrl = 'http://localhost:3000'; // Change this to your JSON Server URL

  constructor(private http: HttpClient) { }

  createUser(postData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users`, postData);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/users`)
  }
}