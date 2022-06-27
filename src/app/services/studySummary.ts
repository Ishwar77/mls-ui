import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from './api-response';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })

export class ALSStudySummaryMaterialService {

    constructor(
        public http: HttpClient
    ) { }

    /*-------------------Study Material Summary API URL----------------------------*/
    public getSummaryMaterialDataList(entity: string, study_id: string,version): Observable<ApiResponse> {
        const url = `${environment.apiUrl}${entity}/version/${version}/studyid/${study_id}`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    /** Run mapping api */
    public runmapping(model, id): Observable<ApiResponse> {
        const url = `${environment.apiUrl}study/runmap/${id}`;
        return this.http.put(url, model, { responseType: 'json', observe: 'body' });
    }
    /** Get list by study id */
    public getlistbystudy(study_id: string): Observable<ApiResponse> {
        const url = `${environment.apiUrl}form/studyid/${study_id}`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    /** Get list by study id */
    public getsdtmmappeddata(id): Observable<ApiResponse> {
        const url = `${environment.apiUrl}sdtmmaping/studyid/${id}`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }

    /** Get testcase */
    public getFieldsByNested(study_id: string, field_id: string,version): Observable<ApiResponse> {
        //original one was this
        // const url = `${environment.apiUrl}ver2test/version/${version}/fieldoid/${field_id}/study/${study_id}`;
        // const url = `${environment.apiUrl}ver2test/studyid/Draft 1.0/fieldid/AEACN`;
        //recent one for all testcases
        const url = `${environment.apiUrl}ver2test/studyid/${study_id}`
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }

    /** get folder list by alsid latest version */
    public getfolderbyalsid(als_id: string): Observable<ApiResponse> {
        const url = `${environment.apiUrl}folder/latestversion/study/${als_id}`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
     /** get all folder list by alsid  */
     public getallfolderbyalsid(als_id: string): Observable<ApiResponse> {
        const url = `${environment.apiUrl}folder/studyid/${als_id}`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }

    /** get form list by alsid & folderid */
    public getformbyfolder(folderid,als_id: string,version): Observable<ApiResponse> {
        const url = `${environment.apiUrl}form/version/${version}/folderoid/${folderid}/studyid/${als_id}`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    /** get form list on matrix script */
    public getformbyfoldermatrix(model): Observable<ApiResponse> {
        // const url = `${environment.apiUrl}form/runmatrixscript`;
        const url = `http://localhost:3000/api/form/runmatrixscript`;
        return this.http.post(url,model, { responseType: 'json', observe: 'body' });
    }    

    /**get folder by folderid */    
    public getfoldernameByfolderId(folderid): Observable<ApiResponse> {
        const url = `${environment.apiUrl}folder/${folderid}`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    /**get fields by folderoid & studyid*/    
    public getfieldDatabyformoid(formid,studyid,version): Observable<ApiResponse> {
        // const url = `${environment.apiUrl}field/version/${version}/formoid/${formid}/studyid/${studyid}`;
        const url = `${environment.apiUrl}field/studyid/${studyid}`
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    /** update folder */
    public updatefolder(model, id): Observable<ApiResponse> {
        const url = `${environment.apiUrl}folder/${id}`;
        return this.http.put(url, model, { responseType: 'json', observe: 'body' });
    } 
    /** update form */
    public updateform(model, id): Observable<ApiResponse> {
        const url = `${environment.apiUrl}form/${id}`;
        return this.http.put(url, model, { responseType: 'json', observe: 'body' });
    }
    /** get folderdata by version */
    public getdatabyversion(version,alsid): Observable<ApiResponse> {
        const url = `${environment.apiUrl}folder/version/${version}/studyid/${alsid}`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }

    
    
    
    
}
