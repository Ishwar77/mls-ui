import { Component, AfterViewInit, Input, Output, EventEmitter, ChangeDetectorRef } from "@angular/core";

@Component({
    selector: 'app-intelogiz-dashboard-card',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})
export class AppDashboardStackCardComponent implements AfterViewInit {

    @Output() cardDataEmits: EventEmitter<any> =
        new EventEmitter<any>();


    /**
     * Input Data
     */
    _model = {};
    @Input()
    get model() {
        return this._model;
    }
    set model(s) {
        this._model = s;
        this.cdref.markForCheck();
    }

    constructor(
        private cdref: ChangeDetectorRef
    ) { }

    ngAfterViewInit() {

    }

    dataEmits(item) {
        this.cardDataEmits.next(item);
        this.cdref.markForCheck();
    }

}
