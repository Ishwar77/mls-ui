import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFormPageComponet } from './form';
import { AppAlsModule } from 'src/app/containers/als';
import { AppFormModule } from 'src/app/containers/form';

const route: Routes = [
    { path: '', component: AppFormPageComponet }
];


@NgModule({
    declarations: [AppFormPageComponet],
    imports: [
        CommonModule,
        RouterModule.forChild(route),
        AppFormModule
    ],
    exports: [AppFormPageComponet],
})
export class AppFormPageModule { }