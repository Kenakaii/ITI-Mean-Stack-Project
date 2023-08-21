import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ISignup } from './ISignup';

@Injectable({
  providedIn: 'root'
})
export class UserService
{
  url="http://localhost:3000";

  constructor(public http:HttpClient) { }

  signupUser(userName:string, userEmail:string, userPassword:string):Observable<any>
  {
    let userData:ISignup = {
      userName:userName,
      userEmail:userEmail,
      userPassword:userPassword
    }
    return this.http.post(`${this.url}/Users/signup`, userData)
  }

  loginUser(userEmail:string, userPassword:string):Observable<any>
  {
    return this.http.post(`${this.url}/Users/login`, {userEmail:userEmail, userPassword:userPassword})
  }
}
