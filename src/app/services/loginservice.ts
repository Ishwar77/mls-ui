import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiResponse } from '../services/api-response';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { tap } from "rxjs/operators";
@Injectable({
    providedIn: "root",
})
export class LoginService {

    constructor(private httpClient: HttpClient) { }

    

    /**
     * Login 
     */
    public login(model: any): Observable<ApiResponse> {
        const url = `${environment.apiUrl}reglogin/login`;
        return this.httpClient.post(url, model, { responseType: 'json', observe: 'body' }).pipe(tap(res => {
            sessionStorage.setItem('accessToken', res['metaData'][`token`]);
          }));
    }

    
    

}
