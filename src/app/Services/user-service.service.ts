import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthServiseService} from './auth-servise.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  serverPath;
  userToken;
  currentUser;
  configHeaders;

  constructor(private http: HttpClient, private authService: AuthServiseService) {
    this.serverPath = environment.serverPath;
    this.userToken = localStorage.getItem('token');
  }

  getUser(): any {
    this.userToken = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('authorization', `token ${this.userToken}`);
    return this.http.get(`${this.serverPath}/api/users/me`, {headers});
  }

  deleteUser(): any {
    this.userToken = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('authorization', `token ${this.userToken}`);
    this.http.delete(`${this.serverPath}/api/users/me`, {headers})
      .subscribe((res: any) => {
        if (res.massage === 'Success') {
          this.authService.signOut();
        }
      });
  }
}
