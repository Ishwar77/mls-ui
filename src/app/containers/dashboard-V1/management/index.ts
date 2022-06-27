import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppManagementPageComponent } from '../management/component';
import { AppSharedModules } from 'src/app/shared/app-shared-module';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ChartsModule } from 'ng2-charts';
import { AppDashboardCardsModule } from 'src/app/components/dashboard-cards';


const comp = [
  AppManagementPageComponent
]
const addons = [
  NzCardModule,
  ChartsModule,
  NzToolTipModule
];
@NgModule({
    declarations: [comp],
    imports: [ CommonModule,addons,
      AppSharedModules, AppDashboardCardsModule
    ],
    exports: [comp],
    providers: [],
})
export class AppManagementPageModule {}
