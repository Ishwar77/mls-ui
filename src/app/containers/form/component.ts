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
    selector: 'app-form-container-component',
    templateUrl: './component.html',
    styleUrls: ['component.scss']
})
export class AppFormComponent implements OnInit {
    clients: Array<any> = [];
    //     /**
    //      * Form Actions
    //      */
    formAction: FormAction = FormAction.INFO;
    clientModel = {};
    clientid: any;
    folderid: any;
    alsid: any;
    study_id: any;
    sliderData: any;

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
    dataOfForm: any;
    _isVisible = false;
    createvisible = false
    sponsor: any;
    alsname: any;
    sliderTitle = 'Info';
    sliderModel = {
        oid: '',
        draftFormName: ''
    };
    version: any;

    constructor(
        private _cdRef: ChangeDetectorRef,
        private _ctx: ApplicationContext,
        private alssummaryservice: ALSStudySummaryMaterialService,
        private _clientService: ClientService,
        private message: NzMessageService,
        private router: Router,
        private context: ApplicationContext,
        private alsservice: AlsService,
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
            this.folderid = res['folderid'] || '';
            this.version = res['version'] || '';
            this._cdRef.markForCheck();
            this.getClientNameByClientId(this.clientid);
            this._cdRef.markForCheck();
            this.getALSNameByAlsId(this.alsid);
            this._cdRef.markForCheck();
            this.getformbyfolder();
            setTimeout(() => {
                this.context.setData(ContextDataItem.BREADCRUMB, `Client / ${this.sponsor} / ALS / ${this.alsname} / Folder / ${this.folderid} / Version / ${this.version} / Form`);
                this.context.setData(ContextDataItem.PAGE_TITLE, 'Form');
                this._cdRef.markForCheck();
            }, 5000);
        });
    }
    // getformbyfolder() {
    //     this.alssummaryservice.getformbyfolder(this.folderid,this.alsid,this.version).subscribe((res: any) => {
    //         if (res.message === "Success") {
    //             this.data = res['metaData'] ? res['metaData'] : [];
    //         } else {
    //             this.message.error('Error');
    //         }
    //     });
    // }
    offLoader = false;
    getformbyfolder() {
        this.offLoader = false;
        const model =
        {
            study_id: this.alsid,
            version: this.version,
            oid: this.folderid
        }
        this.alssummaryservice.getformbyfoldermatrix(model).subscribe((res: any) => {
            if (res.message === "Success") {
                this.data = res['metaData'] ? res['metaData'] : [];
                const abc = res['metaData'] && res['metaData']['matrixdata'] ? res['metaData']['matrixdata'] : '';
                const parsedata = JSON.parse(JSON.parse(abc));
                // console.log(abc,'parsed', parsedata);
                const filterdata = parsedata && parsedata[0] ? parsedata[0]['Matrix: C1'] : '';
                console.log('filterdata', filterdata);
                this.dataOfForm = filterdata;
                if(filterdata){
                    this.offLoader = true;
                }
                console.log('data', res['metaData']);
                console.log('dataof form,', this.dataOfForm);
            } else {
                this.message.error('Error');
            }
        });
    }

    /**
   * getALSNameByClientId(By Passing Client ID)
   */
    getClientNameByClientId(client_id: any) {
        this._clientService.getClientNameByClientId(client_id).subscribe((res: any) => {
            console.log(res);
            if (res && res.message === 'Success') {
                this.sponsor = res && res['metaData'] && res['metaData'] ? res['metaData']['name'] : [];
                console.log(this.sponsor);
                this._cdRef.markForCheck();
            } else {
                this.message.error('Error');
            }
        });
    }

    /**
     * getALSNameByClientId(By Passing ALS ID)
     */
    getALSNameByAlsId(alsid: any) {
        this.alsservice.getalsbyid(alsid).subscribe((res: any) => {
            console.log(res);
            if (res && res.message === 'Success') {
                console.log(res);
                this.alsname = res && res['metaData'] && res['metaData'] ? res['metaData']['title'] : '';
                this._cdRef.markForCheck();
                console.log(this.alsname);
            } else {
                this.message.error('Error');
            }
        });
    }


    gotosummary(data: any) {
        console.log(data);
        const oid = data ? data['oid'] : ''
        const version = data ? data['version'] : ''
        this.router.navigate([`client/${this.clientid}/als/${this.alsid}/folder/${this.folderid}/form/${this.folderid}/version/${this.version}/summary`]);
    }
    goback() {
        this.router.navigate([`client/${this.clientid}/als/${this.alsid}/folder`]);
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
            !this.sliderModel['draftFormName']
        ) {
            return true;
        }
        return false;
    }
    edit() {
        console.log(this);
    }
    create() { }
    update() {
        const updatedata = {
            "study_id": this.alsid,
            "oid": this.sliderData.oid,
            "ordinal": "JOI.string()",
            "draftFormName": this.sliderData.draftFormName,
            "draftFormActive": "JOI.string()",
            "isTemplate": "JOI.string()",
            "isSignatureRequired": "JOI.string()",
            "viewRestrictions": "JOI.string()",
            "entryRestrictions": "JOI.string()",
            "logDirection": "JOI.string()",
            "version": this.version
        }
        this.alssummaryservice.updateform(updatedata, this.sliderData._id).subscribe(res => {
            this.close();
        })
    }
    test() { }
    close(): void {
        this._isVisible = false;
    }
    open(order: FormAction, item: any): void {
        this.formAction = order;
        if (order === FormAction.CREATE) {
            this.sliderTitle = 'ALS File Upload';
            this.sliderModel = {
                oid: '',
                draftFormName: ''
            };
        } else {
            this.sliderTitle = 'Edit ALS';
            this.sliderModel = item;
        }
        this._isVisible = true;
    }
}
