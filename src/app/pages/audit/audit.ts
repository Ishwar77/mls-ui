import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApplicationContext, ContextDataItem } from 'src/app/utils/context/applicationContext';

@Component({
    selector: 'app-mls-ui-audit',
    templateUrl: './audit.html',
    styleUrls: ['./audit.scss']
})

export class AppAuditPageComponet implements OnInit {
    constructor(
        private context: ApplicationContext
    ) { }

    ngOnInit() {
        this.context.setData(ContextDataItem.PAGE_TITLE, 'Audit');
    }
}