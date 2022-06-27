import { AppSharedModules } from './../../shared/app-shared-module';
import { LayoutSkeletonComponent } from './skeleton';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterModule } from '@angular/router';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

const assets = [
    LayoutSkeletonComponent
];

const addons = [
    NzBadgeModule,
    NzBreadCrumbModule,
    NzLayoutModule,
    NzMenuModule,
    NzListModule,
    NzIconModule,
    NzTabsModule,
    NzInputModule,
    NzGridModule,
    NzCheckboxModule
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        AppSharedModules,
        addons
    ],
    declarations: assets,
    exports: assets,
})
export class LayoutSkeletonModule {

}

