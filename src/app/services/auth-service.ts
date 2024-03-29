import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { LoginUser } from "../models/login-user";
import { LOGIN_API, REGISTER_API } from "../constants/backEnd-api";
import { RegisterUser } from "../models/register-user";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: any;

  constructor(private http: HttpClient) {
    let tkn = localStorage.getItem('auth-token');

    if (tkn) {
      this.setToken(tkn);
    }
  }

  register(user: RegisterUser): any {
    return this.http.post<{ token: string }>(REGISTER_API, user).pipe(
      map((token) => {
        localStorage.setItem('auth-token', token.toString());
        this.setToken(token);
        return token;
      })
    );
  }

  login(user: LoginUser): any {
    return this.http.post<{ token: string }>(LOGIN_API, user).pipe(
      map((token) => {
        localStorage.setItem('auth-token', token.toString());
        this.setToken(token);
        return token;
      })
    );
  }

  private setToken(token: any): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
  }
}
