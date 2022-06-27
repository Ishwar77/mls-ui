import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSharedModules } from '../../../shared/app-shared-module';
import { AppDashboardCardsModule } from '../../../components/dashboard-cards';
import { AppOperationalPageComponent } from './component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ChartsModule } from 'ng2-charts';

const addons = [
    NzCardModule,
    ChartsModule,
    NzToolTipModule
];
@NgModule({
    declarations: [AppOperationalPageComponent],
    imports: [
        CommonModule,
        AppSharedModules,
        AppDashboardCardsModule,
        addons
    ],
    exports: [AppOperationalPageComponent]
})
export class AppOperationalPagesModule { }
