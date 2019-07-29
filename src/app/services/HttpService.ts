import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';



const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
};

@Injectable({
    providedIn: 'root',
})
export class HttpService {

    privilegesUrl = environment.completePrivilegesUrl;
    importPrivilegesUrl = environment.importPrivilegesUrl;

    constructor(private _http: HttpClient) {

    }

    getCompletePrivileges() {
        return this._http.get(this.privilegesUrl);
    }

    postCompletePrivileges(privileges) {
        return this._http.post(this.importPrivilegesUrl, privileges, httpOptions);
    }

}