import { GridComponent } from './grid';
import { AppSharedModules } from './../../shared/app-shared-module';
import { NgModule } from "@angular/core";
import { NzTableModule } from 'ng-zorro-antd/table';

import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { EditOutline, DeleteOutline, ProfileOutline, InfoCircleOutline } from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [ EditOutline, DeleteOutline, ProfileOutline, InfoCircleOutline ];


const assets = [
    GridComponent
];

const dependencies = [
    NzTableModule,
    NzIconModule.forRoot(icons),
]

@NgModule({
    declarations: assets,
    exports: assets,
    imports: [
        AppSharedModules,
        dependencies
    ]
})
export class GridComponentModule {

}
