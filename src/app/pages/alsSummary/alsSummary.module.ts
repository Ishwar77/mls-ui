import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAlsSummaryPageComponet } from './alsSummary';
import { AppAlsSummaryModule } from 'src/app/containers/alsSummary';

const route: Routes = [
    {
        path: '',
        component: AppAlsSummaryPageComponet
    }
];


@NgModule({
    declarations: [AppAlsSummaryPageComponet],
    imports: [
        CommonModule,
        RouterModule.forChild(route),
        AppAlsSummaryModule
    ],
    exports: [AppAlsSummaryPageComponet],
})
export class AppAlsSummaryPageModule { }