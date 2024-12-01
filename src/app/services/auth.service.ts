import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseurl: string = `https://reqres.in/api/`;

  constructor(private http: HttpClient) { }

  sendLogin(data: Login): Observable<any> {
    return this.http.post(this.baseurl + `${'login'}`, data);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
