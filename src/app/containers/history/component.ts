import { ApplicationContext, ContextDataItem } from './../../utils/context/applicationContext';
import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormAction } from 'src/app/models/form-actions';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { AlsService } from 'src/app/services/alsService';
import { Router } from '@angular/router';
import { GridHeader } from 'src/app/components/grid/grid-models';
import { PageAction, PageManager, PageStatus } from 'src/app/models/page-manager';
import { GridRowAction } from 'src/app/components/grid/grid';
import { ClientService } from 'src/app/services/clientService';

@Component({
    selector: 'app-history-container-component',
    templateUrl: './component.html',
    styleUrls: ['component.scss']
})
export class AppHistoryComponent implements OnInit {

    // ignoredCol = CalenderMasterUtil.getHideableHeaders();
    headerAry: Array<GridHeader> = [];
    filteredList = [];
    page: PageManager = new PageManager('', PageStatus.LOADING, PageAction.INFO);
    resourceListValue = [
        {
            Date: '13-oct-2021',
            Element: '<form><field',
            UpdateLog: 'New field created',
            VersionCode: '1.0.1',
            Comment: 'Field AGE has been included',
        },
        {
            Date: '13-oct-2021',
            Element: '<form><field',
            UpdateLog: 'New field created',
            VersionCode: '1.0.1',
            Comment: 'Field AGE has been included',
        },
        {
            Date: '13-oct-2021',
            Element: '<form><field',
            UpdateLog: 'New field created',
            VersionCode: '1.0.1',
            Comment: 'Field AGE has been included',
        }
    ];
    
    clients: Array<any> = [];
    //     /**
    //      * Form Actions
    //      */
    formAction: FormAction = FormAction.INFO;
    sliderTitle = 'Info';
    sliderModel = {
        title: '',
        description: ''
    };
    index = 0;
    tabs = ['Forms', 'Fields', 'Dictionary', 'Folders', 'Matrix', 'Visits'];
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
    createvisible = false

    //history data
    historyData: any = [];

    constructor(
        private _cdRef: ChangeDetectorRef,
        private _context: ApplicationContext,
        private alsservice: AlsService,
        private message: NzMessageService,
        private router: Router,
        private clientservice: ClientService,

    ) { }

    ngOnInit() {
        this._context.setData(ContextDataItem.PAGE_TITLE, 'History');
        this._context.setData(ContextDataItem.BREADCRUMB, 'Client / ALS / Summary / History');
        this.getstudybyclientid();

        this.getallhistory();
    }

    getallhistory() {
        this.clientservice.getallHistoty().subscribe(res => {
            if (res.message === "Success") {
                this.historyData = res['metaData'] ? res['metaData'] : [];
                console.log(this.historyData);
            } else {
                // this.message.error('Error');
                console.log("error");
            }
        })
    }

    getstudybyclientid() {
        const id = '61094f862339c24598ff59cd'
        this.alsservice.getstudybyclientid(id).subscribe((res: any) => {
            if (res) {
                this.data = res.message ? res.message : [];
            } else {
                this.message.error('Error');
            }
        })
    }
    open(order: FormAction, item: any): void {
        this.formAction = order;
        if (order === FormAction.CREATE) {
            this.sliderTitle = 'ALS File Upload';
            this.sliderModel = {
                title: '',
                description: ''
            };
        } else {
            this.sliderTitle = 'Edit ALS';
            this.sliderModel = item;
        }
        this._isVisible = true;
    }

    sliderActionBtnClick(btn: any) {
        if (btn === 'close' || btn === 'summary') {
            this.close();
        }
        const error = this.hasError();

        if (error) {
            this.message.warning(
                'warning All Inputs are Mandatory In order to reach your Datastore, we would require all the information.'
            );
            return;
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
        this.close();
    }
    hasError() {
        if (
            !this.sliderModel ||
            !this.sliderModel['title'] ||
            !this.sliderModel['description']
        ) {
            return true;
        }
        return false;
    }
    edit() {
        console.log('edit');
    }
    create() {
        const data = {
            "sponsor_id": "6108df12c250e7015cf5f086",
            "description": this.sliderModel.description,
            "title": this.sliderModel.title,
            "deleteExisting": "NO",
            "projectName": "PRJCT - 3",
            "projectType": "PRJCT - TYPE",
            "primaryFormOID": "FORM - ID - 3",
            "DefaultMatrixOID": "DFTM - 3",
            "confirmMessage": "MESSAGE - CONFIRM",
            "version": "VER - 3",
            "docPath": "/root/PATH-3",
            "signature": "SIGNATURE"
        }
        this.alsservice.createals(data).subscribe((res: any) => {
            if (res) {
                this.message.success('Client Added Successfully')
                this.getstudybyclientid();
            } else {
                this.message.error('Error adding Client')
            }
        })
        this.close();
    }
    update() {
        console.log('update');
    }
    test() {
    }

    close(): void {
        this._isVisible = false;
    }

    handleChange({ file, fileList }: NzUploadChangeParam): void {
        const status = file.status;
        if (status !== 'uploading') {
            console.log(file, fileList);
        }
        if (status === 'done') {
            this.message.success(`${file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            this.message.error(`${file.name} file upload failed.`);
        }
    }
    gotosummary(data: any) {
        const id = "6108df12c250e7015cf5f086";
        this.router.navigate([`client`]);
    }
    gridAction(event?: { data?: any, action: GridRowAction }) {
        if (!event || !event.action) {
            return;
        }

        //To:DO
        // if (this.currentPlanningTabIndex == 1 && event['action'] === 3) {
        //   this.sliderTitle = 'Resources Planned Details';
        //   this.sliderModel = event && event['data'];
        //   this.TrResoOpen(1);
        //   this.visible = true;
        //   this.cdRef.markForCheck();
        // }
    }
    audit() {
        const id = "6108df12c250e7015cf5f086";
        this.router.navigate(['client/${id}/als/${id}/audit']);
    }
    goback() {
        const id = "6108df12c250e7015cf5f086";
        this.router.navigate(['client/${id}/als/${id}']);
    }
}
