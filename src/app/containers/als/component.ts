import { ApplicationContext, ContextActionListencer, ContextDataItem, ContextEvents } from './../../utils/context/applicationContext';
import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormAction } from '../../../app/models/form-actions';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { AlsService } from '../../../app/services/alsService';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { ClientService } from '../../../app/services/clientService';
@Component({
    selector: 'app-als-container-component',
    templateUrl: './component-v2.html',
    styleUrls: ['component.scss']
})
export class AppAlsComponent implements OnInit {

    //     ignoredCol = CalenderMasterUtil.getHideableHeaders();
    //     headerAry: Array<GridHeader> = [];
    //     filteredList = [];
    //     page: PageManager = new PageManager(null, PageStatus.LOADING, PageAction.INFO);
    // resourceListValue = [{
    //     title: 'FormOID',
    // }, {
    //     title: 'FieldOID',
    // }, {
    //     title: 'Ordinal',
    // }, {
    //     title: 'DraftFieldName',
    // }, {
    //     title: 'DraftFieldActive',
    // }, {
    //     title: 'VariableOID',
    // }];
    resourceListValue: any = []
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
    clientModel = {};
    index = 0;
    tabs: any = [];
    // tabs = ['Forms', 'Fields', 'Dictionary', 'Folders', 'Matrix', 'Visits'];
    sampleFilePath: any;
    docPath: any;
    clientid: any;
    colid: any;
    listofdata: any = [];
    resultset: any = [];
    study_id: any;
    sliderData: any;
    versionlist: any = [];
    editalsupload = false;
    advancedtab = false;
    version: any;
    disableuplaod = true;
    syncalsid: any;


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
    noDataActionStatus: any;
    _isVisible = false;
    createvisible = false

    breadCrumb?: Array<{ title?: string, path?: string, icon?: string }> = [];

    //new UI changes
    clientname: any;

    constructor(
        private _cdRef: ChangeDetectorRef,
        private _ctx: ApplicationContext,
        private alsservice: AlsService,
        private _clientService: ClientService,
        private message: NzMessageService,
        private router: Router,
        private context: ApplicationContext,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.listenToRoute();
    }
    private listenToRoute() {
        this.activatedRoute.params.pipe(debounceTime(200)).subscribe((res) => {
            console.log(this);
            this.clientid = res['clientid'] || -1;
            this._cdRef.markForCheck();
            this.context.setData(ContextDataItem.PAGE_TITLE, 'ALS');
            this.context.setData(ContextDataItem.ROUTERLINKBC, `client/${this.clientid}/als`);
            this.getClientNameByClientId(this.clientid);
            this._cdRef.markForCheck();
            this.getstudybyclientid();

            this.listenToContext();
        });
    }

    private listenToContext() {
        this.context.listener.subscribe((res: ContextActionListencer) => {
            if (res && res.event === ContextEvents.VALUDE_CHANGED) {
                if (res.data.key === ContextDataItem.BREADCRUMB) {
                    this.breadCrumb = res.data.value;
                    console.log(this.breadCrumb);
                    this._cdRef.detectChanges();
                }
            }
        });
    }

    getstudybyclientid() {
        this.alsservice.getstudybyclientid(this.clientid).subscribe((res: any) => {
            if (res.message === "Success") {
                this.data = res['metaData'] ? res['metaData'] : [];
                console.log(this.data);
            } 
            else {
                this.noDataActionStatus = 1;
                this.message.error('Error');
            }
        });
    }

    /**
     * getALSNameByClientId(By Passing Client ID)
     */
    private getClientNameByClientId(client_id: any) {
        this._clientService.getClientNameByClientId(client_id).subscribe((res: any) => {
            console.log(res,'client');
            if (res && res.message === 'Success') {
                this.clientname = res && res['metaData'] && res['metaData'] ? res['metaData']['name'] : [];
                // this.context.setData(ContextDataItem.BREADCRUMB, `Client / ${sponsor} / ALS `);
                this._cdRef.markForCheck();
            } else {
                this.message.error('Error');
            }
        });
    }

    open(order: FormAction, item: any): void {
        this.sliderData = item;
        this.formAction = order;
        if (order === FormAction.CREATE) {
            this.sliderTitle = 'ALS File Upload';
            this.sliderModel = {
                title: '',
                description: ''
            };
            this.advancedtab = false;
            this.editalsupload = false;
        } else {
            console.log('in edit', this);
            this.getbasedonversion(item._id);
            this.getallversions(item._id);
            this.sliderTitle = 'Edit ALS';
            this.sliderModel = item;
            this.advancedtab = false;
            this.editalsupload = true;
            this._cdRef.markForCheck();
        }
        this._isVisible = true;
    }

    getbasedonversion(id) {
        this.alsservice.getbasedonversion(id).subscribe(ele => {
            if (ele && ele['metaData']) {
                this.tabs = [];
                this.resultset = ele['metaData'];
                ele['metaData'].map((ele: any) => {
                    this.tabs.push(ele.entityType);
                    this.filteronsheets(this.tabs[0]);
                });
                // this.versionlist = ele['metaData'];
                // ele['metaData'].map((ele: any) => {
                //     this.versionlist.push(ele.version);
                // });
                // this.versionlist = this.versionlist.filter((value, index) => this.versionlist.indexOf(value) === index);
                // console.log(this.versionlist);
            }
        })
    }
    getdatabyversion(version) {
        this.alsservice.getdatabyversion(version, this.sliderData._id).subscribe(res => {
            console.log(res);
            this.tabs = [];
            res['metaData'].map((ele: any) => {
                this.tabs.push(ele.entityType);
                this.filteronsheets(this.tabs[0]);
            });
        });

    }

    sliderActionBtnClick(btn: any) {
        if (btn === 'close' || btn === 'summary') {
            this.close();
        } else if (btn === 'next') {
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
                // this.formAction = FormAction.INFO;
                this._cdRef.markForCheck;
                //this.create();
                this.updateselected();
                return;

            case 'update':
                this.formAction = FormAction.INFO;
                this._cdRef.markForCheck;
                this.update();
                return;

            case 'next':
                this.advancedtab = true;
                this.create();
                return;

            case 'sync':
                this.sync();
                return;


            case 'test':
                this.test();
                return;
        }
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
        this.disableuplaod = false;
    }
    create() {
        this.advancedtab = true;
        const data = {
            "sponsor_id": this.clientid,
            "description": this.sliderModel.description,
            "title": this.sliderModel.title,
            "docPath": this.docPath,
            "studyStatus": "UNSTAGED",
            "sampleFilePath": JSON.stringify(this.sampleFilePath),
        }
        this.alsservice.createals(data).subscribe((res: any) => {
            if (res) {
                this.message.success('ALS created Successfully');
                this.study_id = res && res['metaData']['_id']
                this.getstudybyclientid();
                if (this.advancedtab === true) {
                    setTimeout(() => {
                        this.getstagedata(res['metaData']['_id']);
                    }, 5000);
                }
            } else {
                this.message.error('Error creating ALS')
            }
        })
    }
    update() {
        const updatedata = {
            "sponsor_id": this.clientid,
            "description": this.sliderData.description,
            "title": this.sliderData.title,
            "docPath": this.docPath,
            "studyStatus": "UNSTAGED",
            "sampleFilePath": JSON.stringify(this.sampleFilePath),
        }
        this.alsservice.updateals(updatedata, this.sliderData._id).subscribe(res => {
            if (res && res.message === "Success") {
                this.message.success(`Updated Successfully`);
                this.advancedtab = true;
                this.getallversions(res['metaData']['_id']);
                this.getbasedonversion(this.sliderData._id);
            }

        })

    }
    test() {
    }

    close(): void {
        this._isVisible = false;
    }

    handleChangeals({ file, fileList }: NzUploadChangeParam): void {
        const status = file.status;
        const length = fileList.length;
        const data = fileList[length-1];
        if (status !== 'uploading') {
        }
        if (status === 'done') {
            this.message.success(`${file.name} file uploaded successfully.`);
            this.docPath = data.response.metaData;
            this._cdRef.markForCheck();
        } else if (status === 'error') {
            this.message.error(`${file.error.error.message}`);
        }
    }
    handleChangealsEdit({ file, fileList }: NzUploadChangeParam): void {
        const status = file.status;
        const length = fileList.length;
        const data = fileList[length - 1];
        console.log(file, fileList);
        if (status !== 'uploading') {
        }
        if (status === 'done') {
            console.log('done', this);
            this.message.success(`${data.response.message}`);
            this.docPath = data.response.metaData;
            this._cdRef.markForCheck();
        }
        // else if( file.error.error.statusCode === '400'){
        //     console.log('error',this);

        //     this.message.error(`${file.error.error.message} sdcasx`);
        // } 
        else if (status === 'error') {
            this.message.error(`${file.error.error.message}`);
        }
    }
    handleChangesample({ file, fileList }: NzUploadChangeParam): void {
        const status = file.status;
        const length = fileList.length;
        const data = fileList[length - 1];
        if (status !== 'uploading') {
        }
        if (status === 'done') {
            this.message.success(`${file.name} file uploaded successfully.`);
            this.sampleFilePath = data.response.metaData;
            this._cdRef.markForCheck();
        } else if (status === 'error') {
            this.message.error(`${file.name} file upload failed.`);
        }
    }
    gotosummary(data: any) {
        const study_id = data ? data['_id'] : ''
        this.router.navigate([`client/${this.clientid}/als/${study_id}`]);
    }
    gotofolder(data: any) {
        const study_id = data ? data['_id'] : ''
        this.router.navigate([`client/${this.clientid}/als/${study_id}/folder`]);
    }

    sdtmView(data: any) {
        console.log(data);
        const study_id = data ? data['_id'] : ''
        this.router.navigate([`client/${this.clientid}/als/${study_id}/sdtm`]);
    }
    getstagedata(id) {
        this.alsservice.getstagedata(id).subscribe((res: any) => {
            if (res.metaData) {
                this.tabs = [];
                this.resultset = res.metaData;
                res.metaData.map((ele: any) => {
                    this.tabs.push(ele.entityType);
                    this.filteronsheets(this.tabs[0]);
                });
            }
        });
    }
    getallversions(id) {
        this.alsservice.getstagedata(id).subscribe((res: any) => {
            if (res.metaData) {
                res['metaData'].map((ele: any) => {
                    this.versionlist.push(ele.version);
                });
                this.versionlist = this.versionlist.filter((value, index) => this.versionlist.indexOf(value) === index);
                console.log(this.versionlist);
            }
        });
    }
    filteronsheets(tab) {
        this.resourceListValue = [];
        const data = this.resultset.filter(ele => ele.entityType === tab);
        this.resourceListValue = JSON.parse(data[0] && data[0].columns ? data[0].columns : []);
        console.log(this.resourceListValue);
        this._cdRef.markForCheck();
    }
    gridAction(ele: any, event?: { data?: any }) {
        const data = this.resultset.filter(res => res.entityType === ele);
        this.colid = data[0]._id;
        this.listofdata = this.resourceListValue;
        console.log(this);
        this.listofdata.map(x => {
            event.data.map(y => {
                if (x.colname === y.colname) {
                    y.isSelected = "false";
                }
            })
            return this.listofdata;
        });
    }
    updateselected() {
        const model = {
            "columns": JSON.stringify(this.listofdata)
        }
        this.alsservice.updateselected(this.colid, model).subscribe(res => {
        })

    }
    sync() {
        this.close();
        const data = {
            "docPath": this.docPath
        }
        if (this.formAction === 2) {
            this.syncalsid = this.study_id;
        }
        else if (this.formAction === 3 || this.formAction === 1) {
            this.syncalsid = this.sliderData._id;
        }
        this.alsservice.sync(data, this.syncalsid).subscribe((res: any) => {
            if (res && res.message === "Study Hierarchy Created Successfully") {
                this.message.success('Sync Successfull');
                this.getstudybyclientid();
            }
        })
    }
    goback() {
        this.router.navigate([`client`]);
    }
}
