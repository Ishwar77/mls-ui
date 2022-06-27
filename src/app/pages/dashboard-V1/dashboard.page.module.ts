import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'operational',
    },
    {
        path: 'operational',
        loadChildren: () => import('./operational/index').then((m) => m.AppDashboardV1OperationalPagesModule)
    },
    {
        path: 'management',
        loadChildren: () => import('./management/index').then((m) => m.AppDashboardV1ManagementPagesModule)
    }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    exports: [],
    providers: [],
})
export class AppDashboardV1PagesModule { }
