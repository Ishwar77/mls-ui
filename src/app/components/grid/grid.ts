import { GridUtilities } from './gridUtils';
import { GridHeader } from './grid-models';
//import { CompanyMaster } from './../../models/company';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

export const enum GridRowAction {
    "EDIT" = 1,
    "DELETE" = 2,
    "INFO" = 3,
    "SELECT" = 4
}

/**
 * A Generic Grid Component
 *
 * ```
 * Usage:
 *
 * <app-grid-component
        [dataItems]="companies"
        [pageSize]="6"
        [allowRowDeletion]="false"
        [allowRowEdit]="false"
        (onEdit)="gridAction($event)"
        (onSelect)="gridAction($event)"
    ></app-grid-component>
 * ```
 */

@Component({
    selector: 'app-grid-component',
    templateUrl: './grid.html',
    styleUrls: ['./grid.scss']
})
export class GridComponent implements OnInit {
    radioValue = 'A';
    public static MIN_COLUMN_SELECTION = 5;
    CompanyMaster: any;
    visibleColumns = [];

    sortOrder: NzTableSortOrder | null;
    sortFn: NzTableSortFn | null;
    sortDirections: NzTableSortOrder[];

    /** Notifies the Row that needs to be edited */
    @Output() onEdit: EventEmitter<{ data: any, action: GridRowAction }> = new EventEmitter<{ data: any, action: GridRowAction }>();

    /** Notifies the Row that needs to be deleted */
    @Output() onDelete: EventEmitter<any> = new EventEmitter();

    /** Notifies the Rows that are choosen */
    @Output() onSelect: EventEmitter<any> = new EventEmitter();

    private _allowRowDeletion = false
    @Input()
    get allowRowDeletion() {
        return this._allowRowDeletion;
    }
    set allowRowDeletion(h) {
        this._allowRowDeletion = h;
    }

    private _allowRowEdit = false
    @Input()
    get allowRowEdit() {
        return this._allowRowEdit;
    }
    set allowRowEdit(h) {
        this._allowRowEdit = h;
    }

    private _allowRowInfo = true;
    @Input()
    get allowRowInfo() {
        return this._allowRowInfo;
    }
    set allowRowInfo(h) {
        this._allowRowInfo = h;
    }

    private _pageSize: number = 10;
    @Input()
    get pageSize() {
        return this._pageSize;
    }
    set pageSize(h) {
        this._pageSize = h;
    }

    private _ignoredCol: any[] = []
    @Input()
    get ignoredCol() {
        return this._ignoredCol;
    }
    set ignoredCol(h) {
        this._ignoredCol = h;
    }

    private _miniMumTableHeaders = GridComponent.MIN_COLUMN_SELECTION;
    @Input()
    get miniMumTableHeaders() {
        return this._miniMumTableHeaders;
    }
    set miniMumTableHeaders(h) {
        this._miniMumTableHeaders = h;
    }


    private _headerAry: GridHeader[] = []
    @Input()
    get headerAry() {
        return this._headerAry;
    }
    set headerAry(h) {
        this._headerAry = h;
        this.cdRef.markForCheck();
    }

    private _dataItems: any[] = [];
    @Input()
    get dataItems() {
        return this._dataItems;
    }
    set dataItems(c) {
        this._dataItems = c;
    }

    private _isCheckBoxEnable = true;
    @Input()
    get isCheckBoxEnable() {
        return this._isCheckBoxEnable;
    }
    set isCheckBoxEnable(d) {
        this._isCheckBoxEnable = d;
    }


    private _showDummy = false;
    @Input()
    get showDummy() {
        return this._showDummy;
    }
    set showDummy(d) {
        this._showDummy = d;
    }

    checkAll = false;
    indeterminate = false;
    dataLoading = false;
    setOfCheckedId = new Set<number>();
    selectedColCount = 0;


    constructor(
        private cdRef: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.initActions();

        // console.log(this);
    }

    private initActions() {
        if (this.showDummy) {
            this.dataItems = this.CompanyMaster.getDummyData();
            this.cdRef.markForCheck();
        }

        let headerAry = []

        if (!this._headerAry || !this._headerAry.length) {
            // If no header array is passed, then build the Array dynamically
            headerAry = GridUtilities.getHeaderAry(this.dataItems ? this.dataItems[0] : null, this._miniMumTableHeaders || GridComponent.MIN_COLUMN_SELECTION);
            headerAry && headerAry.map((col, index) => {
                if (this.ignoredCol.indexOf(col.property) >= 0) {
                    col.isVisible = false;
                }
            });
            this.headerAry = [...headerAry];
            // const sortedArray = this.headerAry && this.headerAry.map(res => {
            //     return Object.assign(res, {}, {
            //         sortOrder: null,
            //         sortFn: (a: any, b: any) => a.title.localeCompare(b.title),
            //         sortDirections: ['ascend', 'descend', null]
            //     });
            // });
        }

        this.visibleColumns = this.headerAry.filter(col => col.isVisible);

        let selected = this.visibleColumns.filter(h => h.selected);
        // console.log(selected)
        if (selected.length < this.miniMumTableHeaders) {
            this.visibleColumns.forEach((col, i) => {
                if (i < this.miniMumTableHeaders) {
                    col.selected = true
                }
            })

            selected = this.visibleColumns.filter(h => h.selected);
        }
        this.selectedColCount = selected.length

        this.cdRef.markForCheck();
    }


    /**
     * Handles the actions in Grid
     * @param data any
     * @param rowAction GridRowAction
     */
    rowAction(data, rowAction: any) {

        const response = {
            data: data, action: rowAction
        };

        if (rowAction === GridRowAction.DELETE) {
            this.onDelete.next(response);

        } else if (rowAction === GridRowAction.EDIT) {
            this.onEdit.next(response);

        } else if (rowAction === GridRowAction.INFO || rowAction === GridRowAction.SELECT) {
            this.onSelect.next(response);

        }
    }

    onRowRadioCheck(data) {
        console.log(data, 'RADION');
    }

    onRowCheck(data) {

        if (!data) {
            return;
        }

        data['selected'] = !Boolean(data['selected']);
        this.cdRef.markForCheck();

        const allSelected = this.dataItems.filter(d => d['selected'] === true);
        this.rowAction(allSelected, GridRowAction.SELECT);
    }

    toggleColumnPick(event, data: GridHeader) {
        //  console.log("colChooser = ", event, data);
        if (!data) {
            return;
        }

        data.selected = event;

        const selected = this.visibleColumns.filter(h => h.selected);
        this.selectedColCount = selected.length;
        //console.log(event, data, this);
        this.cdRef.markForCheck();
    }


}
