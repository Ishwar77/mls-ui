import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDashboardV1OperationalPageComponent } from './component';
import { AppOperationalPagesModule } from '../../../containers/dashboard-V1/operational/index';

const route: Routes = [
    { path: '', component: AppDashboardV1OperationalPageComponent }
];
@NgModule({
    declarations: [AppDashboardV1OperationalPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(route),
        AppOperationalPagesModule
    ],
    exports: [AppDashboardV1OperationalPageComponent],
})
export class AppDashboardV1OperationalPagesModule { }
