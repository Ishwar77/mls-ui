import { NoContentModule } from './../layout/no-content/index';
import { AppLoadingModule } from './../layout/loading/index';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzTableModule } from 'ng-zorro-antd/table';

const components = [
    NzButtonModule,
    NzGridModule,
    NzDatePickerModule,
    NzInputModule,
    NzRadioModule,
    NzFormModule,
    NzSelectModule,
    NzCardModule,
    NzEmptyModule,
    NzToolTipModule,
    NzAlertModule,
    NzMessageModule,
    NzNotificationModule,
    NzSpinModule,
    NzSkeletonModule,
    NzToolTipModule,
    NzPopconfirmModule,
    NzDropDownModule,
    NzCheckboxModule,
    NzAutocompleteModule,
    NzTableModule 
];

const angularSpecigic = [
    CommonModule
];

const addOns = [
    AppLoadingModule,
    NoContentModule
];

/**
 * Commonly used modules of Ant design
 */

@NgModule({
    imports: [components, angularSpecigic, addOns],
    exports: [components, angularSpecigic, addOns]
})
export class AppSharedModules {

}
