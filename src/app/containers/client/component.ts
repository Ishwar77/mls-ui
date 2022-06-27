import { ApplicationContext, ContextDataItem } from './../../utils/context/applicationContext';
import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormAction } from 'src/app/models/form-actions';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/clientService';

import * as XLSX from 'xlsx';

@Component({
    selector: 'app-client-container-component',
    templateUrl: './component.html',
    styleUrls: ['component.scss']
})
export class AppClientComponent implements OnInit {

    listOfData: any = [
        {
            "created": "2022-03-18T07:49:15.099Z",
            "lastUpdated": "2022-03-18T07:49:15.099Z",
            "isActive": true,
            "_id": "620e1ec88cb4a071d179be68",
            "STUDYID": "620e1e7cf99f3c00164a812a",
            "SITEID": "SITE-101",
            "SUBJECT_ID": "1",
            "DRAFT_NAME": "DS7009009 Draft 1.0",
            "eCRFV_VERSION": "Draft-CRF-7cf99f3c00164a812a",
            "Created_By": "SYSTEM",
            "FormOID": "AE",
            "FieldOID": "AEACNOTH",
            "VariableOID": "AEACNOTH",
            "Test_Condition": "Check if max field length is 1"
        },
        {
            "created": "2022-03-18T07:49:15.099Z",
            "lastUpdated": "2022-03-18T07:49:15.099Z",
            "isActive": true,
            "_id": "620e1ec88cb4a071d179be69",
            "STUDYID": "620e1e7cf99f3c00164a812a",
            "SITEID": "SITE-101",
            "SUBJECT_ID": "1",
            "DRAFT_NAME": "DS7009009 Draft 1.0",
            "eCRFV_VERSION": "Draft-CRF-7cf99f3c00164a812a",
            "Created_By": "SYSTEM",
            "FormOID": "AE",
            "FieldOID": "AEACNOTH",
            "VariableOID": "AEACNOTH",
            "Test_Condition": "Other \n\n check if the above pretext is present"
        },
        {
            "created": "2022-03-18T07:49:15.099Z",
            "lastUpdated": "2022-03-18T07:49:15.099Z",
            "isActive": true,
            "_id": "620e1ec88cb4a071d179be6a",
            "STUDYID": "620e1e7cf99f3c00164a812a",
            "SITEID": "SITE-101",
            "SUBJECT_ID": "1",
            "DRAFT_NAME": "DS7009009 Draft 1.0",
            "eCRFV_VERSION": "Draft-CRF-7cf99f3c00164a812a",
            "Created_By": "SYSTEM",
            "FormOID": "AE",
            "FieldOID": "AECONTRT",
            "VariableOID": "AECONTRT",
            "Test_Condition": "Check if max field length is 1"
        }
      ];


    //     ignoredCol = CalenderMasterUtil.getHideableHeaders();
    //     headerAry: Array<GridHeader> = [];
    //     filteredList = [];
    //     page: PageManager = new PageManager(null, PageStatus.LOADING, PageAction.INFO);

    clients: Array<any> = [];
    //     /**
    //      * Form Actions
    //      */
    formAction: FormAction = FormAction.INFO;
    sliderTitle = 'Info';
    sliderModel = {
        name: '',
        description: ''
    };
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
    _isVisible = false;

    fileName= 'ExcelSheet.xlsx';

    constructor(
        private _cdRef: ChangeDetectorRef,
        private _ctx: ApplicationContext,
        private clientservice: ClientService,
        private message: NzMessageService,
        private router: Router,
        private context: ApplicationContext

    ) { }

    ngOnInit() {
        this.context.setData(ContextDataItem.PAGE_TITLE, 'Client');
        this.context.setData(ContextDataItem.BREADCRUMB, 'Client');
        this.getallclient();
    }
    getallclient() {
        this.clientservice.getallclients().subscribe(res => {
            if (res.message === "Success") {
                this.data = res['metaData'] ? res['metaData'] : [];
                const abc = ""
            } else {
                this.message.error('Error');
            }
        })
    }
    open(order: FormAction,data): void {
        this.sliderData = data;
        this._cdRef.markForCheck();
        this.formAction = order;
        if (order === FormAction.CREATE) {
            this.sliderTitle = 'Create Client';
            this.sliderModel = {
                name: '',
                description: ''
            };
        } else {
            console.log(this,data);
            this.sliderModel = data;
            this.sliderTitle = 'Edit Client';
        }
        this._isVisible = true;
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
            !this.sliderModel['name'] ||
            !this.sliderModel['description']
        ) {
            return true;
        }
        return false;
    }
    edit() {
        console.log(this);
    }
    create() {
        const data = {
            "description": this.sliderModel.description,
            "name": this.sliderModel.name
        }
        this.clientservice.createclient(data).subscribe((res: any) => {
            if (res) {
                this.message.success('Client Added Successfully')
                this.getallclient();
            } else {
                this.message.error('Error adding Client')
            }
        })
        this.close();

    }
    update() {
        const updatedata = {
            "description": this.sliderData.description,
            "name": this.sliderData.name
        }
        this.clientservice.updateclient(updatedata,this.sliderData._id).subscribe(res=>{
            this.close();
        })
    }
    test() {

    }

    close(): void {
        this._isVisible = false;
    }
    gotoals(data: any) {
        console.log('id',data);
        this.router.navigate([`client/${data._id}/als`], data);
    }

    export() {
        console.log("hii")
        let element = document.getElementById('basicTable');
        const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
     
        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
     
        /* save to file */  
        XLSX.writeFile(wb, this.fileName);
    }
}
