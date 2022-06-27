import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHistoryPageComponet } from './history';
import { AppHistoryModule } from 'src/app/containers/history';

const route: Routes = [
    { path: '', component: AppHistoryPageComponet }
];


@NgModule({
    declarations: [AppHistoryPageComponet],
    imports: [
        CommonModule,
        RouterModule.forChild(route),
        AppHistoryModule
    ],
    exports: [AppHistoryPageComponet],
})
export class AppHistoryPageModule { }