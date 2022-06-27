import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAlsPageComponet } from './als';
import { AppAlsModule } from 'src/app/containers/als';

const route: Routes = [
    { path: '', component: AppAlsPageComponet }
];


@NgModule({
    declarations: [AppAlsPageComponet],
    imports: [
        CommonModule,
        RouterModule.forChild(route),
        AppAlsModule
    ],
    exports: [AppAlsPageComponet],
})
export class AppAlsPageModule { }