import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDashboardV1ManagementPageComponent } from './component';
import {AppManagementPageModule} from '../../../containers/dashboard-V1/management'

const route: Routes = [
    { path: '', component: AppDashboardV1ManagementPageComponent }
];
@NgModule({
    declarations: [AppDashboardV1ManagementPageComponent],
    imports: [
        CommonModule,
        AppManagementPageModule,
        RouterModule.forChild(route)
    ],
    exports: [AppDashboardV1ManagementPageComponent],
})
export class AppDashboardV1ManagementPagesModule { }
