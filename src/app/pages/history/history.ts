import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApplicationContext, ContextDataItem } from 'src/app/utils/context/applicationContext';

@Component({
    selector: 'app-mls-ui-history',
    templateUrl: './history.html',
    styleUrls: ['./history.scss']
})

export class AppHistoryPageComponet implements OnInit {
    constructor(
        private context: ApplicationContext
    ) { }

    ngOnInit() {
        this.context.setData(ContextDataItem.PAGE_TITLE, 'History');
    }
}