import { CommonModule } from '@angular/common';
import { AppDashboardCardsComponent } from './component';
import { NgModule } from '@angular/core';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
// --> Lazy loaded Icons
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { EditOutline, DatabaseOutline, ExpandOutline } from '@ant-design/icons-angular/icons';
const icons: IconDefinition[] = [EditOutline, DatabaseOutline, ExpandOutline];
// <-- Lazy loaded Icons


const assets = [
    AppDashboardCardsComponent
];

const addons = [
    NzBreadCrumbModule,
    NzCardModule,
    NzToolTipModule,
    NzIconModule.forRoot(icons)
];

@NgModule({
    imports: [CommonModule, addons],
    declarations: [assets],
    exports: [assets]
})
export class AppDashboardCardsModule {

}
