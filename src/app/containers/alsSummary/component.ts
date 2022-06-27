import { ApplicationContext, ContextDataItem } from './../../utils/context/applicationContext';
import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { PageAction, PageManager, PageStatus } from '../../../app/models/page-manager';
import { FormAction } from '../../../app/models/form-actions';
import { ALSStudySummaryMaterialService } from '../../../app/services/studySummary';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import jsPDF from 'jspdf';
import 'jspdf-autotable'
import { GridHeader } from '../../../app/components/grid/grid-models';
import { GridUtilities } from '../../../app/components/grid/gridUtils';
import { GridComponent } from '../../../app/components/grid/grid';
import { AlsService } from '../../../app/services/alsService';
import { ClientService } from 'src/app/services/clientService';
@Component({
    selector: 'app-als-summary-container-component',
    templateUrl: './component.html',
    styleUrls: ['component.scss']
})
export class AppAlsSummaryComponent implements OnInit {

    page: PageManager = new PageManager('', PageStatus.LOADING, PageAction.INFO);
    formAction: FormAction = FormAction.INFO;
    _folderTableheaderAry: Array<GridHeader> = [];
    ignoredColdictionary = ['created', 'lastUpdated', 'study_id', 'uuid', '__v', '_id'];
    ignoredColmatrix = ['created', 'lastUpdated', 'study_id', 'uuid', '__v', '_id'];
    ignoredColvisits = ['created', 'lastUpdated', 'study_id', 'uuid', '__v', '_id', 'matrix_id'];
    sliderTitle = 'Info';
    sliderModel = {};
    _UIHandleData: any = {
        tabList: [],
        formsList: [],
        fieldList: [],
        datadictionaryList: [],
        folderList: [],
        matrixList: [],
        visitsList: [],
        uploadCardsList: [],
        sdtmlist: [],
        sdtmTabList: [],
        fieldHeadings: [],
        fieldNestedTestcases: [],
        studyModel: {},
        fieldTestCase: false,
        version: ''
    }
    sdtmresultset: any = [];
    _isRunMapSliderVisible = false;
    success;
    ignoreCol = ['STUDYID'];
    sampleFilePath: any;
    header: any = [];
    headerbody: any = [];
    enablerun = false;
    mainheaders: any = [];
    bodydata: any = [];
    sponsor: any;
    alsname: any;



    @Output() onClose: EventEmitter<any> = new EventEmitter();
    @Output() onOpen: EventEmitter<any> = new EventEmitter();


    /**
     * Input Form Actions
    */
    _formOrder: any;
    @Input()
    get formOrder() {
        return this._formOrder;
    }
    set formOrder(d) {
        this._formOrder = d;
        this._cdRef.markForCheck();
    }

    constructor(
        private _cdRef: ChangeDetectorRef,
        private _context: ApplicationContext,
        private _alsStudySummaryService: ALSStudySummaryMaterialService,
        private message: NzMessageService,
        private activatedRoute: ActivatedRoute,
        private _alsService: AlsService,
        private _clientService: ClientService,
        private router: Router
    ) { }

    ngOnInit() {
        this._context.setData(ContextDataItem.PAGE_TITLE, 'Summary');
        /* Get the ID by URL */
        this.loadActivatedRoute();
        this.getlistbystudy();
        this._cdRef.markForCheck();
    }

    loadActivatedRoute() {
        this.activatedRoute.params.subscribe(params => {
            if (params) {
                this._UIHandleData['clientid'] = params ? params['clientid'] : '';
                this._cdRef.markForCheck();
                this._UIHandleData['alsListId'] = params ? params['alsid'] : '';
                this._cdRef.markForCheck();
                this._UIHandleData['formid'] = params ? params['formid'] : '';
                this._UIHandleData['folderoid'] = params ? params['folderid'] : '';
                this._UIHandleData['version'] = params ? params['version'] : ''; 
                this.loadALSSummary();
                this._cdRef.markForCheck();
                this.getClientNameByClientId(this._UIHandleData ? this._UIHandleData['clientid'] : '');
                this._cdRef.markForCheck();
                this.getALSNameByAlsId(this._UIHandleData ? this._UIHandleData['alsListId'] : '')
                this._UIHandleData['isSDTMUIShow'] = false;
                setTimeout(() => {
                    this._context.setData(ContextDataItem.BREADCRUMB, `Client / ${this.sponsor} / ALS / ${this.alsname} / Folder / ${this._UIHandleData['folderoid']} / Form / ${this._UIHandleData['formid']} / Version / ${this._UIHandleData['version']} / Summary`);
                    this._context.setData(ContextDataItem.PAGE_TITLE, 'Form');
                    this._cdRef.markForCheck();
                }, 5000);
            }
        });
    }

    /**
   * getALSNameByClientId(By Passing Client ID)
   */
    private getClientNameByClientId(client_id: any) {
        this._clientService.getClientNameByClientId(client_id).subscribe((res: any) => {
            if (res && res.message === 'Success') {
                this.sponsor = res && res['metaData'] && res['metaData'] ? res['metaData']['name'] : [];
                this._cdRef.markForCheck();
            } else {
                this.message.error('Error');
            }
        });
    }
    /**
   * getALSNameByClientId(By Passing ALS ID)
   */
    private getALSNameByAlsId(alsid: any) {
        this._alsService.getalsbyid(alsid).subscribe((res: any) => {
            if (res && res.message === 'Success') {
                this.alsname = res && res['metaData'] && res['metaData'] ? res['metaData']['title'] : '';
                this._cdRef.markForCheck();
            } else {
                this.message.error('Error');
            }
        });
    }


    /** Build Grid Header Dynamically Data */
    // private buildGridData(data: any[]) {
    //     const headerAry = GridUtilities.getHeaderAry(data ? data[0] : null, GridComponent.MIN_COLUMN_SELECTION);

    //     headerAry && headerAry.map((col) => {
    //         if (this.ignoredCol.indexOf(col.property) >= 0) {
    //             col.isVisible = false;
    //         }
    //     });
    //     this._folderTableheaderAry = [...headerAry ? headerAry : []];
    //     this._cdRef.markForCheck();
    // }

    loadServiceCallsAPI(data: any) {
        this._alsStudySummaryService.getfieldDatabyformoid(this._UIHandleData['formid'], this._UIHandleData['alsListId'], this._UIHandleData['version']).subscribe(res => {
            const data = res ? res['metaData'] : [];
            this._UIHandleData['fieldList'] = data && data.filter(ele => {
                ele['expand'] = false;
                return ele;
            });
            this._cdRef.markForCheck();
            this._UIHandleData['selectedTabDataCount'] = this._UIHandleData ? this._UIHandleData['fieldList'].length : 0;
            this._cdRef.markForCheck();
        });
        const entityTab = data ? data['key'] : '';
        console.log('tab',entityTab);
        if(entityTab !== "field"){
            this._alsStudySummaryService.getSummaryMaterialDataList(entityTab, this._UIHandleData['alsListId'],this._UIHandleData['version']).subscribe(res => {
                if (res && res['message'] === 'Success') {
                    if (data && data['key'] === 'datadictionary') {
                        this._UIHandleData['datadictionaryList'] = res ? res['metaData'] : [];
                        this._cdRef.markForCheck();
                        this._UIHandleData['selectedTabDataCount'] = this._UIHandleData ? this._UIHandleData['datadictionaryList'].length : 0;
                        this._cdRef.markForCheck();
                    } else if (data && data['key'] === 'matrix') {
                        this._UIHandleData['matrixList'] = res ? res['metaData'] : [];
                        this._cdRef.markForCheck();
                        this._UIHandleData['selectedTabDataCount'] = this._UIHandleData ? this._UIHandleData['matrixList'].length : 0;
                        this._cdRef.markForCheck();
                    } else if (data && data['key'] === 'visits') {
                        this._UIHandleData['visitsList'] = res ? res['metaData'] : [];
                        this._cdRef.markForCheck();
                        this._UIHandleData['selectedTabDataCount'] = this._UIHandleData ? this._UIHandleData['visitsList'].length : 0;
                        this._cdRef.markForCheck();
                    }
                }
            });
        }
       
        
    }


    loadALSSummary() {
        const tabList = this._context.getData(ContextDataItem.ALS_SUMMARY);
        this._UIHandleData['tabList'] = tabList ? tabList['tabSwitchDataList'] : [];
        this._cdRef.markForCheck();
        this.selectedTab({ name: "Field", key: "field", stage: 0, icon: "field-string" });
        this._cdRef.markForCheck();
    }

    /** Tab Selection Changes Event */
    tabselectionChange(event) {
        this._UIHandleData['selectedTabEvent'] = event;
        if (this._UIHandleData['selectedTabEvent'].index === 6) {
            this._UIHandleData['selectedTabDataCount'] = this._UIHandleData ? this._UIHandleData['sdtmlist'].length : 0;
        }
        this._cdRef.markForCheck();
    }

    selectedTab(event) {
        if (!event) {
            return;
        }
        setTimeout(() => {
            this._UIHandleData['selectedTab'] = event ? event : {};
            this._cdRef.markForCheck();
            if (event && event['key'] === 'field') {
                console.log(event);
                this.loadServiceCallsAPI(event);
                this._cdRef.markForCheck();
            } else if (event && event['key'] === 'datadictionary') {
                this.loadServiceCallsAPI(event);
                this._cdRef.markForCheck();
            } else if (event && event['key'] === 'matrix') {
                this.loadServiceCallsAPI(event);
                this._cdRef.markForCheck();
            } else if (event && event['key'] === 'visits') {
                this.loadServiceCallsAPI(event);
                this._cdRef.markForCheck();
            }
        }, 0);
    }

    audit() {
        const id = "6108df12c250e7015cf5f086";
        this.router.navigate([`client/${id}/als/${this._UIHandleData['alsListId']}/audit`]);
    }
    history() {
        const id = "6108df12c250e7015cf5f086";
        this.router.navigate([`client/${id}/als/${this._UIHandleData['alsListId']}/history`]);
    }

    infoSlider(data) {
        console.log(data);
    }

    gridAction(data) {
        console.log(data);
    }
    /** Upload Cards List for SDTM Slider */
    getlistbystudy() {
        this._alsStudySummaryService.getlistbystudy(this._UIHandleData['alsListId']).subscribe(res => {
            if (res) {
                this._UIHandleData['uploadCardsList'] = res['metaData'] ? res['metaData'] : [];
                this._cdRef.markForCheck();
            }
        });
    }

    handleChange(info: NzUploadChangeParam): void {
        console.log(info);
        if (info.file.status !== 'uploading') {
        }
        if (info.file.status === 'done') {
            this.message.success(`${info.file.name} file uploaded successfully`);
            this.success = true;
            this.sampleFilePath = info.file['response']['metaData'];
            if (this.sampleFilePath) {
                this.enablerun = true;
            }
            this._cdRef.markForCheck();
        } else if (info.file.status === 'error') {
            this.message.error(`${info.file.name} file upload failed.`);
        }
    }
    /** to export to pdf */
    export() {
        this.header = [];
        this.mainheaders = [];
        this.bodydata = [];
        if (this._UIHandleData['selectedTab'] && this._UIHandleData['selectedTab']['key'] === "field") {
            this.bodydata = [this._UIHandleData['fieldList']][0];
            var columnsIn = this._UIHandleData['fieldList'][0];
        } else if (this._UIHandleData['selectedTab'] && this._UIHandleData['selectedTab']['key'] === "dictionary") {
            this.bodydata = [this._UIHandleData['datadictionaryList']][0];
            var columnsIn = this._UIHandleData['datadictionaryList'][0];
        } else if (this._UIHandleData['selectedTab'] && this._UIHandleData['selectedTab']['key'] === "matrix") {
            this.bodydata = [this._UIHandleData['matrixList']][0];
            var columnsIn = this._UIHandleData['matrixList'][0];
        } else if (this._UIHandleData['selectedTab'] && this._UIHandleData['selectedTab']['key'] === "visits") {
            this.bodydata = [this._UIHandleData['visitsList']][0];
            var columnsIn = this._UIHandleData['visitsList'][0];
        }

        for (var key in columnsIn) {
            this.header.push(key);
        }
        const keys = this.header;
        const values = this.header;
        const merged = keys.reduce((obj, key, index) => ({ ...obj, [key]: values[index] }), {});
        this.mainheaders[0] = merged;

        let doc = new jsPDF('l', 'pt', 'a4');
        doc.setFontSize(18);
        doc.text(this._UIHandleData.selectedTab.name, 40, 25);

        (doc as any).autoTable({
            head: this.mainheaders,
            body: this.bodydata,
            theme: 'grid',
            styles: { cellWidth: 'auto' },
            minCellWidth: 10,
            minCellHeight: 10,
            halign: 'center',
            valign: 'middle',

        });

        /**
         * To Open PDF document in new tab
         */
        doc.output('dataurlnewwindow');

        /**
         * To Download PDF document
         */
        doc.save(this._UIHandleData.selectedTab.name);


    }
    /** to export testcases to pdf */
    exporttestcases() {
        this.header = [];
        this.mainheaders = [];
        this.bodydata = [];

        this.bodydata = [this._UIHandleData['fieldNestedTestcases']][0];
        var columnsIn = this._UIHandleData['fieldNestedTestcases'][0];

        for (var key in columnsIn) {
            this.header.push(key);
        }
        const keys = this.header;
        const values = this.header;
        const merged = keys.reduce((obj, key, index) => ({ ...obj, [key]: values[index] }), {});
        this.mainheaders[0] = merged;

        let doc = new jsPDF('l', 'pt', 'a4');
        doc.setFontSize(18);
        doc.text('Test Cases', 40, 25);

        (doc as any).autoTable({
            head: this.mainheaders,
            body: this.bodydata,
            theme: 'grid',
            styles: { cellWidth: 'auto' },
            minCellWidth: 10,
            minCellHeight: 10,
            halign: 'center',
            valign: 'middle',

        });

        /**
         * To Open PDF document in new tab
         */
        doc.output('dataurlnewwindow');

        /**
         * To Download PDF document
         */
        doc.save('Test Cases');


    }
    goback() {
        this.router.navigate([`client/${this._UIHandleData['clientid']}/als/${this._UIHandleData['alsListId']}/folder/${this._UIHandleData['folderoid']}/version/${this._UIHandleData['version']}/form`]);
    }

    /** View Test Cases */
    viewTestCases(data: any) {
        this._UIHandleData['fieldTestCase'] = true;
        console.log(this._UIHandleData, data, 'VIEW');
        this._cdRef.markForCheck();
        const dummyTescases = {
            study_id: this._UIHandleData['alsListId'],
            field_OID: 'PART'
        }
        this._alsStudySummaryService.getFieldsByNested(this._UIHandleData['alsListId'], data['fieldOID'],this._UIHandleData['version']).subscribe(res => {
            if (res && res['message'] === 'Success') {
                this._UIHandleData['fieldNestedTestcases'] = res ? res['metaData'] : [];
                this._cdRef.markForCheck();
            }
        });
    }

    backToMainField() {
        this._UIHandleData['fieldTestCase'] = false;
        console.log(this._UIHandleData, 'VIEW');
    }
}
