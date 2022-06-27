import { Component, OnInit } from '@angular/core';
import { ApplicationContext, ContextDataItem } from '../../../utils/context/applicationContext';

@Component({
    selector: 'app-logix-insights-operationaldash-page',
    templateUrl: './component.html'
})

export class AppDashboardV1OperationalPageComponent implements OnInit {
    constructor(
        private context: ApplicationContext
    ) { }

    ngOnInit() {
        this.context.getData(ContextDataItem.DASHBOARD);
        this.context.setData(ContextDataItem.PAGE_TITLE, 'Operational');
    }
}
