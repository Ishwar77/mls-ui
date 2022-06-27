import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFieldTestcasesContainerComponent } from './component';
import { FormsModule } from '@angular/forms';
import { AppSharedModules } from 'src/app/shared/app-shared-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import { FileOutline, UploadOutline, DownloadOutline, DeleteOutline } from '@ant-design/icons-angular/icons';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';


const icons: IconDefinition[] = [FileOutline, UploadOutline, DownloadOutline, DeleteOutline];

const addons = [
    NzIconModule.forRoot(icons),NzDrawerModule
]

@NgModule({
    declarations: [AppFieldTestcasesContainerComponent],
    imports: [
        CommonModule,
        FormsModule,
        AppSharedModules,
        FlexLayoutModule,
        addons
    ],
    exports: [AppFieldTestcasesContainerComponent]
})
export class AppFieldTestcasesContainerModule { }