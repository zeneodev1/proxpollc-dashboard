import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../shared/model/user';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly API_URL = environment.api_url;
  constructor(private httpClient: HttpClient) {
  }

  public login(user: User): Observable<any> {
    return this.httpClient.post<string>(this.API_URL + '/users/login', user, {
      // @ts-ignore
      responseType: 'text'
    }).pipe(map(value => {
      console.log(value);
      return value;
    }));
  }

  public changePassword(changePasswordRequest: any): Observable<any> {
    return this.httpClient.put(this.API_URL + '/users/changePassword', changePasswordRequest);
  }
}
