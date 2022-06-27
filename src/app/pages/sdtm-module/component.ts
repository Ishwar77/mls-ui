import { Component, OnInit } from '@angular/core';
import { ApplicationContext, ContextDataItem } from '../../utils/context/applicationContext';

@Component({
    selector: 'app-pages-sdtm',
    templateUrl: './component.html'
})

export class AppSDTMComponent implements OnInit {
    constructor(
        private context: ApplicationContext
    ) { }

    ngOnInit() {
        this.context.setData(ContextDataItem.PAGE_TITLE, 'SDTM');
    }
}