import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApplicationContext, ContextDataItem } from 'src/app/utils/context/applicationContext';

@Component({
    selector: 'app-mls-ui-als',
    templateUrl: './als.html',
    styleUrls: ['./als.scss']
})

export class AppAlsPageComponet implements OnInit {
    constructor(
        private context: ApplicationContext
    ) { }

    ngOnInit() {

    }
}