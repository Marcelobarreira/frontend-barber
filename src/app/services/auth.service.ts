import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseurl, environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${baseurl}${environment.LOGIN}`, { email, password });
  }

  register(email: string, password: string, username: string): Observable<any> {
    return this.http.post(`${baseurl}${environment.REGISTER}`, { email, password, username });
  }

  makeAdmin(userId: string): Observable<any> {
    return this.http.patch(`${baseurl}${environment.ADMIN}`, { userId });
  }
}
