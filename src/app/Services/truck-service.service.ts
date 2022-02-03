import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthServiseService} from './auth-servise.service';

@Injectable({
  providedIn: 'root'
})
export class TruckServiceService {
  serverPath;
  userToken;
  constructor(private http: HttpClient, private authService: AuthServiseService) {
    this.serverPath = environment.serverPath;
    this.authService.UserToken.subscribe((res) => {
      this.userToken = res;
    });
  }
  getMyTrucks(): any {
    const headers = new HttpHeaders()
      .set('authorization', `token ${this.userToken}`);
    return this.http.get(`${this.serverPath}/api/trucks`, { headers });
  }
  addTruck(type: string, name: string): any {
    const headers = new HttpHeaders()
      .set('authorization', `token ${this.userToken}`);
    return this.http.post(`${this.serverPath}/api/trucks`, {type, name}, { headers });
  }
  updateTruck(type: string, id: string): any {
    const headers = new HttpHeaders()
      .set('authorization', `token ${this.userToken}`);
    return this.http.put(`${this.serverPath}/api/trucks/${id}`, {type}, { headers });
  }
  assignTruck(id: string): any {
    const headers = new HttpHeaders()
      .set('authorization', `token ${this.userToken}`);
    return this.http.post(`${this.serverPath}/api/trucks/${id}/assign`, {}, { headers });
  }
  unAssignTruck(id: string): any {
    const headers = new HttpHeaders()
      .set('authorization', `token ${this.userToken}`);
    return this.http.post(`${this.serverPath}/api/trucks/${id}/unAssign`, {}, { headers });
  }
  deleteTruck(id: string): any {
    const headers = new HttpHeaders()
      .set('authorization', `token ${this.userToken}`);
    return this.http.delete(`${this.serverPath}/api/trucks/${id}`, { headers });
  }
}
