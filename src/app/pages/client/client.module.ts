import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppClientPageComponet } from './client';
import { AppClientModule } from 'src/app/containers/client';

const route: Routes = [
    { path: '', component: AppClientPageComponet }
];


@NgModule({
    declarations: [AppClientPageComponet],
    imports: [
        CommonModule,
        RouterModule.forChild(route),
        AppClientModule
    ],
    exports: [AppClientPageComponet],
})
export class AppClientPageModule { }