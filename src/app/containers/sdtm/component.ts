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
    selector: 'app-sdtm-container-component',
    templateUrl: './component.html',
    styleUrls: ['component.scss']
})
export class SDTMComponent implements OnInit {

    page: PageManager = new PageManager('', PageStatus.LOADING, PageAction.INFO);
    formAction: FormAction = FormAction.INFO;
    _folderTableheaderAry: Array<GridHeader> = [];
    ignoredCol = ['  V'];
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
        fieldTestCase: false
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
                this._cdRef.markForCheck();
                this.getClientNameByClientId(this._UIHandleData ? this._UIHandleData['clientid'] : '');
                this._cdRef.markForCheck();
                this.getALSNameByAlsId(this._UIHandleData ? this._UIHandleData['alsListId'] : '')
                this._UIHandleData['isSDTMUIShow'] = false;
                setTimeout(() => {
                    this._context.setData(ContextDataItem.BREADCRUMB, `Client / ${this.sponsor} / ALS / ${this.alsname} / SDTM`);
                    this._context.setData(ContextDataItem.PAGE_TITLE, 'SDTM');
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
    runMap() {
        this._UIHandleData['runMapSliderTitle'] = 'SDTM Mapping';
        this._cdRef.markForCheck();
        this._isRunMapSliderVisible = true;
        this._cdRef.markForCheck();
    }

    /** Run SDTM Slider Information */
    sliderActionBtnClick(btn: any) {
        if (btn === 'close' || btn === 'summary') {
            this.runMapSliderClose();
        } else if (btn === 'save') {
            // const error = this.hasError();
            // if (error) {
            //     this.message.warning(
            //         'warning All Inputs are Mandatory In order to reach your Datastore, we would require all the information.'
            //     );
            //     return;
            // }
        }

        switch (btn) {
            case 'save':
                this.formAction = FormAction.INFO;
                this._cdRef.markForCheck;
                this.enableRunUI();
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

    runMapSliderClose() {
        this._isRunMapSliderVisible = false;
        this._cdRef.markForCheck();
    }

    enableRunUI() {
        const data = {
            "rawData": JSON.stringify(this.sampleFilePath)
        }
        this._alsStudySummaryService.runmapping(data, this._UIHandleData['alsListId']).subscribe(res => {
            if (res['metaData']) {
                this.runMapSliderClose();
                this._UIHandleData['isSDTMUIShow'] = true;
                this.getsdtmappeddata();
            }
        });
        this._cdRef.markForCheck();
        this._cdRef.markForCheck();
    }
    getsdtmappeddata() {
        const id = '6108df12c250e7015cf5f086';
        this._alsStudySummaryService.getsdtmmappeddata(id).subscribe(res => {
            this._UIHandleData['sdtmlist'] = [];
            if (res && res['metaData']) {
                this.sdtmresultset = res['metaData'] ? res['metaData'] : [];
                res['metaData'].map((ele: any) => {
                    this._UIHandleData['sdtmTabList'].push(ele.entityType);
                });
                this._UIHandleData['sdtmlist'] = JSON.parse(this.sdtmresultset && this.sdtmresultset[0]['mapped_data']);
            }
        });
    }

    /** SDTM DETAILS */
    sdtmTabselectionChange(event) {
        console.log(event);
    }

    sdtmSelectedTab(event) {
        const data = this.sdtmresultset.filter(res => res.entityType === event);
        this._UIHandleData['sdtmlist'] = JSON.parse(data[0]['mapped_data']);
        this._UIHandleData['selectedTabDataCount'] = this._UIHandleData ? this._UIHandleData['sdtmlist'].length : 0;
        this._cdRef.markForCheck();
        console.log(this);
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

}
