
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

// --> Lazy loaded Icons
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DatabaseOutline,  TableOutline, ProfileOutline} from '@ant-design/icons-angular/icons';
import { AppSharedModules } from 'src/app/shared/app-shared-module';
import { AppAuthPageComponent } from './component';
import { FormsModule } from '@angular/forms';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
const icons: IconDefinition[] = [ DatabaseOutline,  TableOutline, ProfileOutline ];
// <-- Lazy loaded Icons


const assets = [
    AppAuthPageComponent
];

const addons = [
    NzInputModule,NzAvatarModule,
    NzButtonModule,FormsModule,
    NzIconModule.forRoot(icons),
];

const routes: Routes = [
    {
        path: '',
        component: AppAuthPageComponent
    }
];


@NgModule({
    imports: [CommonModule, AppSharedModules, addons, RouterModule.forChild(routes)],
    declarations: [assets],
    exports: [assets]
})
export class AppAuthPageModule {

}
