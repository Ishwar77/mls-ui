import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppIntelogizDashboardPlannerComponentContainer } from './component';
import { AppDashboardCardModule } from '../../../components/stack-card/index';
// import { AppSharedIndexModule } from '../../../shared/index';
import { AppSharedModules } from '../../../shared/app-shared-module';

import { NzIconModule } from 'ng-zorro-antd/icon';

import { ChartsModule } from 'ng2-charts';

const comp = [
    AppIntelogizDashboardPlannerComponentContainer
]

@NgModule({
    declarations: [
        comp,
    ],
    imports: [
        CommonModule,
        AppSharedModules,
        AppDashboardCardModule,
        ChartsModule,
        NzIconModule
        // AppSharedIndexModule
    ],
    exports: [
        comp,
        ChartsModule
    ]
})
export class AppDashboardPlannerModule { }