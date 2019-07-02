import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root',
  })
export class HttpService {

    privilegesUrl = environment.completePrivilegesUrl;

    constructor(private _http: HttpClient) {

    }

    getCompletePrivileges() {
        return this._http.get(this.privilegesUrl);
    }

}