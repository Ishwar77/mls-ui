import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAuditPageComponet } from './audit';

const route: Routes = [
    { path: '', component: AppAuditPageComponet }
];


@NgModule({
    declarations: [AppAuditPageComponet],
    imports: [
        CommonModule,
        RouterModule.forChild(route)
    ],
    exports: [AppAuditPageComponet],
})
export class AppAuditPageModule { }