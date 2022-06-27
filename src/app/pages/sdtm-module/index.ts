import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSDTMComponent } from './component';
import { RouterModule, Routes } from '@angular/router';
import { SDTMModule } from 'src/app/containers/sdtm';

const route: Routes = [
    { path: '', component: AppSDTMComponent }
];

@NgModule({
    declarations: [AppSDTMComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(route),
        SDTMModule
    ],
    exports: [AppSDTMComponent],
})
export class AppSDTMModule { }