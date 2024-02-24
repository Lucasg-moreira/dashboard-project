import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

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

  createCompany(postData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/company`, postData);
  }

  getCompanys(): Observable<any> {
    return this.http.get(`${this.baseUrl}/company`);
  }

  createCompanyUrl(postData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/companyUrl`, postData);
  }

  getCompanyUrlById(id: string) {
    return this.http.get(`${this.baseUrl}/companyUrl`).pipe(
      map(res => {
        return Object.values(res).filter((el: any) => el.id == id);
      })
    )
  }

  getCompanyUrl(): Observable<any> {
    return this.http.get(`${this.baseUrl}/companyUrl`);
  }
}