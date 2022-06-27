import { ApplicationContext, ContextDataItem } from './../../utils/context/applicationContext';
import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormAction } from '../../../app/models/form-actions';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { AlsService } from '../../../app/services/alsService';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { ClientService } from '../../../app/services/clientService';
import { ALSStudySummaryMaterialService } from 'src/app/services/studySummary';
@Component({
    selector: 'app-folder-container-component',
    templateUrl: './component.html',
    styleUrls: ['component.scss']
})
export class AppFolderComponent implements OnInit {
    clients: Array<any> = [];
    //     /**
    //      * Form Actions
    //      */
    formAction: FormAction = FormAction.INFO;
    alsmodel = {};
    clientid: any;
    alsid: any;
    study_id: any;
    sliderTitle = 'Info';
    sliderModel = {
        oid: '',
        folderName: ''
    };
    sliderData: any;
    versionlist: any = [];

    //new UI changes
    clientname: any;

    alsName: any;


    //     /** Data Emits Outside of the parent */
    @Output() onClose: EventEmitter<any> = new EventEmitter();
    @Output() onOpen: EventEmitter<any> = new EventEmitter();

    //     /**
    //  * Input Form Actions
    //  */
    _formOrder: any;
    @Input()
    get formOrder() {
        return this._formOrder;
    }
    set formOrder(d) {
        this._formOrder = d;
        this._cdRef.markForCheck();
    }
    data: any = [];
    _isVisible = false;
    createvisible = false;
    sponsor: any;
    alsname: any;

    constructor(
        private _cdRef: ChangeDetectorRef,
        private _ctx: ApplicationContext,
        private alssummaryservice: ALSStudySummaryMaterialService,
        private alsservice: AlsService,
        private message: NzMessageService,
        private router: Router,
        private context: ApplicationContext,
        private _clientService: ClientService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.listenToRoute();
    }
    private listenToRoute() {
        this.activatedRoute.params.pipe(debounceTime(200)).subscribe((res) => {
            console.log('res', res);
            this.alsid = res['alsid'] || -1;
            this.clientid = res['clientid'] || -1;
            this._cdRef.markForCheck();
            // this.context.setData(ContextDataItem.BREADCRUMB, `Client / ALS / Folder`);
            this.context.setData(ContextDataItem.PAGE_TITLE, 'Folder');
            this.getALSNameByAlsId(this.alsid);
            this._cdRef.markForCheck();
            this.getClientNameByClientId(this.clientid);
            setTimeout(() => {
                this.context.setData(ContextDataItem.BREADCRUMB, `Client / ${this.sponsor} / ALS / ${this.alsname} / Folder `);
                this._cdRef.markForCheck();
            }, 5000);
            this.getallfolderbyalsid();
            this.getfolderbyalsid();
            this._cdRef.markForCheck();
        });
    }
    getfolderbyalsid() {
        this.alssummaryservice.getfolderbyalsid(this.alsid).subscribe((res: any) => {
            if (res.message === "Success") {
                this.data = res['metaData'] ? res['metaData'] : [];
                // res['metaData'].map((ele: any) => {
                //     this.versionlist.push(ele.version);
                // });
                // this.versionlist = this.versionlist.filter((value, index) => this.versionlist.indexOf(value) === index);
                // console.log(this.versionlist);     
            } else {
                this.message.error('Error');
            }
        });
    }
    getallfolderbyalsid(){
        this.alssummaryservice.getallfolderbyalsid(this.alsid).subscribe((res: any) => {
            if (res.message === "Success") {
                res['metaData'].map((ele: any) => {
                    this.versionlist.push(ele.version);
                });
                this.versionlist = this.versionlist.filter((value, index) => this.versionlist.indexOf(value) === index);
                console.log(this.versionlist);     
            } else {
                this.message.error('Error');
            }
        });
    }

    /**
   * getALSNameByClientId(By Passing Client ID)
   */
    private getClientNameByClientId(client_id: any) {
        this._clientService.getClientNameByClientId(client_id).subscribe((res: any) => {
            if (res && res.message === 'Success') {
                this.clientname = this.sponsor = res && res['metaData'] && res['metaData'] ? res['metaData']['name'] : [];
                console.log(this.sponsor);
            } else {
                this.message.error('Error');
            }
        });
    }

    /**
     * getALSNameByClientId(By Passing ALS ID)
     */
    private getALSNameByAlsId(alsid: any) {
        this.alsservice.getalsbyid(alsid).subscribe((res: any) => {
            if (res && res.message === 'Success') {
                console.log(res);
                this.alsName = this.alsname = res && res['metaData'] && res['metaData'] ? res['metaData']['title'] : '';
                console.log(this.alsname);

                this._cdRef.markForCheck();
            } else {
                this.message.error('Error');
            }
        });
    }

    gotoform(data: any) {
        console.log(data);
        const study_id = data ? data['study_id'] : ''
        const oid = data ? data['oid'] : ''
        const version = data ? data['version'] : ''
        console.log('version',data);
        this.router.navigate([`client/${this.clientid}/als/${study_id}/folder/${oid}/version/${version}/form`]);
    }

    goback() {
        this.router.navigate([`client/${this.clientid}/als`]);
    }

    gobackClent() {
        this.router.navigate([`client`]);
    }

    sliderActionBtnClick(btn: any) {
        if (btn === 'close' || btn === 'summary') {
            this.close();
        } else {
            const error = this.hasError();
            if (error) {
                this.message.warning(
                    'warning All Inputs are Mandatory In order to reach your Datastore, we would require all the information.'
                );
                return;
            }
        }

        switch (btn) {
            case 'edit':
                this.formAction = FormAction.EDIT;
                this._cdRef.markForCheck;
                this.edit();
                return;

            case 'save':
                this.formAction = FormAction.INFO;
                this._cdRef.markForCheck;
                this.create();
                return;

            case 'update':
                this.formAction = FormAction.INFO;
                this._cdRef.markForCheck;
                this.update();
                return;

            case 'test':
                this.test();
                return;
        }
    }
    hasError() {
        if (
            !this.sliderModel ||
            !this.sliderModel['oid'] ||
            !this.sliderModel['folderName']
        ) {
            return true;
        }
        return false;
    }
    edit() {
        console.log(this);
    }
    create() {}
    update() {    
        const updatedata = {           
            "study_id": this.alsid, 
            "oid":this.sliderData.oid, 
            "ordinal": "6", 
            "folderName": this.sliderData.folderName, 
            "parentFolderOID": "POID", 
            "isReusable": "true",
            "version": "V1"
        }
        this.alssummaryservice.updatefolder(updatedata,this.sliderData._id).subscribe(res=>{
            this.close();
        })
    }
    test() {}

    close(): void {
        this._isVisible = false;
    }
    open(order: FormAction, item: any): void {
        this.formAction = order;
        if (order === FormAction.CREATE) {
            this.sliderTitle = 'ALS File Upload';
            this.sliderModel = {
                oid: '',
                folderName: ''
            };
        } else {
            this.sliderTitle = 'Edit ALS';
            this.sliderModel = item;
        }
        this._isVisible = true;
    }
    getdatabyversion(version) {
        console.log(version);
        this.alssummaryservice.getdatabyversion(version,this.alsid).subscribe(res => {
            console.log(res);
            if(res.message === "Success"){
                this.data = res['metaData'] ? res['metaData'] : [];
            }
        });
        
    }
}
