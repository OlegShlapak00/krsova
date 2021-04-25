import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';


class LoginResponse {
  massage: string;
  token?: string;
}


@Injectable({
  providedIn: 'root',
})

export class AuthServiseService {
  IsLogged ;
  serverPath;

  constructor(private http: HttpClient) {
    this.serverPath = environment.serverPath;
    if (localStorage.getItem('token') !== null){
      this.IsLogged = new BehaviorSubject<boolean>(true);
    }
    else {
      this.IsLogged = new BehaviorSubject<boolean>(false);
    }
  }

  login(email: string, password: string): void {
    this.http.post(`${this.serverPath}/api/auth/login`, {email, password})
      .subscribe((res: any) => {
        if (res.token) {
          this.IsLogged.next(true);
          localStorage.setItem('token', res.token);
          console.log('login success');
        }
      });
  }

  register(email: string, password: string, role: string): void {
    this.http.post(`${this.serverPath}/api/auth/register`,
      {email, password, role})
      .subscribe((res: any) => {
        if (res.massage === 'Success') {
          console.log('registration success');
          this.login(email, password);
        }
      });
  }

  signOut(): void {
    this.IsLogged.next(false);
    localStorage.removeItem('token');
  }
}
