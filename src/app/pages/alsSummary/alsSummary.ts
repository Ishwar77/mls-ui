import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApplicationContext, ContextDataItem } from 'src/app/utils/context/applicationContext';

@Component({
    selector: 'app-mls-ui-als-Summary',
    templateUrl: './alsSummary.html',
    styleUrls: ['./alsSummary.scss']
})

export class AppAlsSummaryPageComponet implements OnInit {
    constructor(
        private context: ApplicationContext
    ) { }

    ngOnInit() {
        this.context.setData(ContextDataItem.PAGE_TITLE, 'ALS List');
        this.context.setData(ContextDataItem.BREADCRUMB, 'Client / ALS / ALS Summary');
    }
    
}