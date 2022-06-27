import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApplicationContext, ContextDataItem } from 'src/app/utils/context/applicationContext';

@Component({
    selector: 'app-mls-ui-client',
    templateUrl: './client.html',
    styleUrls: ['./client.scss']
})

export class AppClientPageComponet implements OnInit {
    constructor(
        private context: ApplicationContext
    ) { }

    ngOnInit() {
    }
}