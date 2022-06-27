import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFolderPageComponet } from './folder';
import { AppAlsModule } from 'src/app/containers/als';
import { AppFolderModule } from 'src/app/containers/folder';

const route: Routes = [
    { path: '', component: AppFolderPageComponet }
];


@NgModule({
    declarations: [AppFolderPageComponet],
    imports: [
        CommonModule,
        RouterModule.forChild(route),
        AppFolderModule
    ],
    exports: [AppFolderPageComponet],
})
export class AppFolderPageModule { }