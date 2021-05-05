import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthServiseService} from './auth-servise.service';


interface Load {
  name: string;
  payload: number;
  pickup_address: string;
  delivery_address: string;
  dimensions: {
    width: number;
    height: number;
    length: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class LoadServiceService {
  serverPath;
  userToken;
  constructor(private http: HttpClient, private authService: AuthServiseService) {
    this.serverPath = environment.serverPath;
    this.authService.UserToken.subscribe((res) => {
      this.userToken = res;
    });
  }
  getAllLoads(): any {
    const headers = new HttpHeaders()
      .set('authorization', `token ${this.userToken}`);
    return this.http.get(`${this.serverPath}/api/loads`, { headers });
  }
  getLoadForID(id: string): any {
    const headers = new HttpHeaders()
      .set('authorization', `token ${this.userToken}`);
    return this.http.get(`${this.serverPath}/api/loads/${id}`, { headers });
  }
  postLoad( load: Load ): any {
    const headers = new HttpHeaders()
      .set('authorization', `token ${this.userToken}`);
    return this.http.post(`${this.serverPath}/api/loads`, load, {headers});
  }
  postLoadForId(id: string): any {
    const headers = new HttpHeaders()
      .set('authorization', `token ${this.userToken}`);
    return this.http.post(`${this.serverPath}/api/loads/${id}/post`, {}, { headers });
  }
  updateLoadForId(load: Load, id: string): any {
    const headers = new HttpHeaders()
      .set('authorization', `token ${this.userToken}`);
    return this.http.put(`${this.serverPath}/api/loads/${id}`, load, { headers });
  }
  deleteLoadForId(id: string): any {
    const headers = new HttpHeaders()
      .set('authorization', `token ${this.userToken}`);
    return this.http.delete(`${this.serverPath}/api/loads/${id}`,  { headers });
  }
  changeState(id: string): any {
    const headers = new HttpHeaders()
      .set('authorization', `token ${this.userToken}`);
    return this.http.patch(`${this.serverPath}/api/loads/${id}/state`, {},  { headers });
  }

}
