import { AppSharedModules } from './../../shared/app-shared-module';
// import { GridComponentModule } from './../../components/grid/index';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

// --> Lazy loaded Icons
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PlusOutline } from '@ant-design/icons-angular/icons';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FormsModule } from '@angular/forms';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { AppAlsSummaryComponent } from './component';
import { EditOutline, InfoOutline, ReadOutline } from '@ant-design/icons-angular/icons';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { GridComponentModule } from 'src/app/components/grid';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { AppUploadCardContainerModule } from './upload-card-container';
import { AppFieldTestcasesContainerModule } from './fieldtestcases';


const icons: IconDefinition[] = [EditOutline, InfoOutline, ReadOutline, PlusOutline];

const addons = [
    NzInputModule,
    NzIconModule.forRoot(icons),
    NzGridModule,
    NzTimePickerModule,
    NzDrawerModule,
    NzButtonModule,
    NzTabsModule,
    NzUploadModule,
    NzCheckboxModule
];

const comp = [
    AppAlsSummaryComponent,
]

const route = [
    {
        path: '',
        component: AppAlsSummaryComponent
    },
    {
        path: 'audit',
        loadChildren: () => import('./audit/index').then(m => m.AppAuditModule)
    }
]

@NgModule({
    declarations: [
        comp
    ],
    exports: [
        comp
    ],
    imports: [
        CommonModule,
        AppSharedModules,
        FormsModule,
        // Testing
        GridComponentModule,
        AppUploadCardContainerModule,
        AppFieldTestcasesContainerModule,
        FlexLayoutModule,
        RouterModule.forChild(route),
        addons
    ]
})
export class AppAlsSummaryModule { }
