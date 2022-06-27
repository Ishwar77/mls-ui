import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApplicationContext, ContextDataItem } from 'src/app/utils/context/applicationContext';

@Component({
    selector: 'app-mls-ui-form',
    templateUrl: './form.html',
    styleUrls: ['./form.scss']
})

export class AppFormPageComponet implements OnInit {
    constructor(
        private context: ApplicationContext
    ) { }

    ngOnInit() {

    }
}