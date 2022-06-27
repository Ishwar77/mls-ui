import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiResponse } from '../services/api-response';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
    providedIn: "root",
})
export class ClientService {

    constructor(private httpClient: HttpClient) { }

    /**
     * Get all 
     */
    public getallclients(): Observable<ApiResponse> {
        const url = `${environment.apiUrl}sponsor/getActiveSponsors`;
        return this.httpClient.get(url, { responseType: 'json', observe: 'body' });
    }

    //get history data
    public getallHistoty(): Observable<ApiResponse> {
        const url = `http://localhost:3000/api/history/`;
        return this.httpClient.get(url, { responseType: 'json', observe: 'body' });
    }


    /**
     * Create 
     */
    public createclient(model: any): Observable<ApiResponse> {
        const url = `${environment.apiUrl}sponsor/create`;
        return this.httpClient.post(url, model, { responseType: 'json', observe: 'body' });
    }

    /** get client by clientid */
    public getClientNameByClientId(clientid): Observable<ApiResponse> {
        const url = `${environment.apiUrl}sponsor/${clientid}`;
        return this.httpClient.get(url, { responseType: 'json', observe: 'body' });
    }
    /** Update */
    public updateclient(model: any,id): Observable<ApiResponse> {
        const url = `${environment.apiUrl}sponsor/${id}`;
        return this.httpClient.put(url, model, { responseType: 'json', observe: 'body' });
    }
    
    

}
