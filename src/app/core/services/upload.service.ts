import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private readonly API_URL = environment.api_url;
  constructor(private httpClient: HttpClient) {
  }

  public uploadFile(file: File): Observable<any> {
    const fileFormDate = new FormData();
    fileFormDate.append('file', file);
    return this.httpClient.post(this.API_URL + '/files/upload', fileFormDate);
  }
}
