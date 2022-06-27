import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApplicationContext, ContextDataItem } from 'src/app/utils/context/applicationContext';

@Component({
    selector: 'app-intelogiz-dashboard',
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.scss']
})

export class AppDashboardComponet implements OnInit {
    constructor(
        private context: ApplicationContext,
        private cdRef: ChangeDetectorRef
    ) { }

    ngOnInit() {
        // this.context.getData(ContextDataItem.DASHBOARD);
        this.context.setData(ContextDataItem.PAGE_TITLE, 'Workbench');
    }
}