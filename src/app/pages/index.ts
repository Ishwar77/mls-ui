import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/index').then(m => m.AppAuthPageModule)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.AppDashboardModule)
    },
    {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.AppClientPageModule)
    },
    {
        path: 'client/:clientid/als',
        loadChildren: () => import('./als/als.module').then(m => m.AppAlsPageModule)
    },
    {
        path: 'client/:clientid/als/:alsid/sdtm',
        loadChildren: () => import('./sdtm-module/index').then(m => m.AppSDTMModule)
    },
    {
        path: 'client/:clientid/als/:alsid/folder',
        loadChildren: () => import('./folder/folder.module').then(m => m.AppFolderPageModule)
    },
    {
        path: 'client/:clientid/als/:alsid/folder/:folderid/version/:version/form',
        loadChildren: () => import('./form/form.module').then(m => m.AppFormPageModule)
    },
    {
        path: 'client/:clientid/als/:alsid/folder/:folderid/form/:formid/version/:version/summary',
        loadChildren: () => import('./alsSummary/alsSummary.module').then(m => m.AppAlsSummaryPageModule)
    },
    {
        path: 'client/:clientid/als/:alsid/history',
        loadChildren: () => import('./history/history.module').then(m => m.AppHistoryPageModule)
    },
    {
        path: 'client/:clientid/als/:alsid/audit',
        loadChildren: () => import('./audit/audit.module').then(m => m.AppAuditPageModule)
    },
    { path:'',  loadChildren: () => import('./auth/index').then(m => m.AppAuthPageModule)},    
  {
    path:'**', loadChildren: () => import('./auth/index').then(m => m.AppAuthPageModule)
  },
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
})
export class AppPagesIndexModule { }
