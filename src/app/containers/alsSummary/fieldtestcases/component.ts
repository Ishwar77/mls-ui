import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
    selector: 'app-mls-field-testcases-container',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class AppFieldTestcasesContainerComponent implements OnInit {
    title = "Test Samples";
    isVisible = false;
    @Output() onClick: EventEmitter<any> = new EventEmitter();
    @Output() onUpload: EventEmitter<any> = new EventEmitter();

    /**
     * Input Form Actions
    */
    _dataItems: any;
    @Input()
    get dataItems() {
        return this._dataItems;
    }
    set dataItems(d) {
        this._dataItems = d;
        this._cdRef.markForCheck();
    }

    _uploadurl: any;
    @Input()
    get uploadurl() {
        return this._uploadurl;
    }
    set uploadurl(d) {
        this._uploadurl = d;
        this._cdRef.markForCheck();
    }

    constructor(
        private _cdRef: ChangeDetectorRef,
        private msg: NzMessageService
    ) { }

    ngOnInit() {
        console.log(this);
     }

    upload(data) {
        this.onUpload.next(data);
        this._cdRef.markForCheck();
    }
    runMapSliderClose(){

    }
    slider(){
        console.log(this);
        this.isVisible = true;
    }
    close(){
        this.isVisible = false;
    }


}