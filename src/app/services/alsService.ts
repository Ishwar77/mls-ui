import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiResponse } from '../services/api-response';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: "root",
})
export class AlsService {

    constructor(private httpClient: HttpClient) { }

  
     /**
     * Get all active studies
     */
      public getallstudies(): Observable<ApiResponse> {
        const url = `${environment.apiUrl}study/getActiveStudies`;
        return this.httpClient.get(url, { responseType: 'json', observe: 'body' });
    }

         /**
     * Get all active forms
     */

    public getallforms(): Observable<ApiResponse> {
        const url = `${environment.apiUrl}form/getActiveForm`;
        return this.httpClient.get(url, { responseType: 'json', observe: 'body' });
    }

      /**
     * Get all 
     */

    public getstudybyclientid(id): Observable<ApiResponse> {
        const url = `${environment.apiUrl}study/sponsorid/${id}`;
        return this.httpClient.get(url, { responseType: 'json', observe: 'body' });
    }

    /**
     * Create 
     */
    public createals(model: any): Observable<ApiResponse> {
        const url = `${environment.apiUrl}study/create`;
        return this.httpClient.post(url, model, { responseType: 'json', observe: 'body' });
    }

    /**Get stage data for advance slider */

    public getstagedata(id): Observable<ApiResponse> {

        const url = `${environment.apiUrl}alsStaging/studyid/${id}`;

        return this.httpClient.get(url, { responseType: 'json', observe: 'body' });

    }

    /** Update selected */
    public updateselected(id: any, model): Observable<ApiResponse> {
        const url = `${environment.apiUrl}alsstaging/${id}`;
        return this.httpClient.put(url, model, { responseType: 'json', observe: 'body' });
    }
    /**
     * Create 
     */
    public sync(model: any, id): Observable<ApiResponse> {
        // const url = `${environment.apiUrl}alsStaging/staging/${id}`;
        // const url = `http://13.127.115.135:3000/api/alsStaging/staging/${id}`
        const url = `http://localhost:3000/api/alsStaging/staging/${id}`
        return this.httpClient.post(url, model, { responseType: 'json', observe: 'body' });
    }

    /** get als by alsid for breadcrumb */
    public getalsbyid(alsid): Observable<ApiResponse> {
        const url = `${environment.apiUrl}study/${alsid}`;
        return this.httpClient.get(url, { responseType: 'json', observe: 'body' });
    }

    /** update */
    public updateals(model: any, id): Observable<ApiResponse> {
        const url = `${environment.apiUrl}study/${id}`;
        return this.httpClient.put(url, model, { responseType: 'json', observe: 'body' });
    }
     /** get als by alsid for breadcrumb */
     public getbasedonversion(alsid): Observable<ApiResponse> {
        const url = `${environment.apiUrl}alsStaging/latestversion/study/${alsid}`;
        return this.httpClient.get(url, { responseType: 'json', observe: 'body' });
    }
     /** get advanced data by version */
     public getdatabyversion(version,alsid): Observable<ApiResponse> {
        const url = `${environment.apiUrl}alsStaging/version/${version}/studyid/${alsid}`;
        return this.httpClient.get(url, { responseType: 'json', observe: 'body' });
    }

    
    


}
