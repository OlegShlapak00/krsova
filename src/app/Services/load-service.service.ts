import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../environments/environment';


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
  constructor(private http: HttpClient) {
    this.serverPath = environment.serverPath;
    this.userToken = localStorage.getItem('token');
  }
  getAllLoads(): any {
    const headers = new HttpHeaders()
      .set('authorization', `token ${this.userToken}`);
    return this.http.get(`${this.serverPath}/api/loads`, { headers });
  }
  getLoadForID(id: string): any {
    const headers = new HttpHeaders()
      .set('authorization', `token ${this.userToken}`);
    const params = new HttpParams().set('id', id);
    return this.http.get(`${this.serverPath}/api/loads`, { headers, params });
  }
  postLoad( load: Load ): any {
    const headers = new HttpHeaders()
      .set('authorization', `token ${this.userToken}`);
    return this.http.post(`${this.serverPath}/api/loads`, load, {headers});
  }
}
