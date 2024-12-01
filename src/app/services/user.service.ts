import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseurl: string = `https://reqres.in/api/`;

  constructor(private http: HttpClient) { }

  getAllUsers(page:number): Observable<any> {
    return this.http.get(this.baseurl + `${'users'}`, {params: { page }});
  }

  getUserById(id:number): Observable<any> {
    return this.http.get(this.baseurl + `${'users/'}` + id);
  }

  addNewUser(data: NewUser): Observable<any> {
    return this.http.post(this.baseurl + `${'users'}`, data);
  }

  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(this.baseurl + `${'users/'}` + id, data);
  }

  deleteUserById(id:number): Observable<any> {
    return this.http.delete(this.baseurl + `${'users/'}` + id);
  }

}
