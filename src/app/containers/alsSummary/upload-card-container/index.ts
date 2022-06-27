import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppUploadCardContainerComponent } from './component';
import { FormsModule } from '@angular/forms';
import { AppSharedModules } from 'src/app/shared/app-shared-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import { FileOutline, UploadOutline, DownloadOutline, DeleteOutline } from '@ant-design/icons-angular/icons';


const icons: IconDefinition[] = [FileOutline, UploadOutline, DownloadOutline, DeleteOutline];

const addons = [
    NzIconModule.forRoot(icons),
]

@NgModule({
    declarations: [AppUploadCardContainerComponent],
    imports: [
        CommonModule,
        FormsModule,
        AppSharedModules,
        FlexLayoutModule,
        addons
    ],
    exports: [AppUploadCardContainerComponent]
})
export class AppUploadCardContainerModule { }