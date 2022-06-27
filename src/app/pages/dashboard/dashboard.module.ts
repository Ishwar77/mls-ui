import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDashboardComponet } from './dashboard';
import { AppDashboardPlannerModule } from '../../containers/dashboard/planner-dashboard/index';


const route: Routes = [
    { path: '', component: AppDashboardComponet }
];


@NgModule({
    declarations: [AppDashboardComponet],
    imports: [
        CommonModule,
        RouterModule.forChild(route),
        AppDashboardPlannerModule
    ],
    exports: [AppDashboardComponet],
})
export class AppDashboardModule { }