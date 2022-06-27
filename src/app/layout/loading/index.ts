import { CommonModule } from '@angular/common';
import { AppLoadingComponent } from './component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        AppLoadingComponent
    ],
    exports: [
        AppLoadingComponent
    ],
    imports: [
        CommonModule
    ]
})
export class AppLoadingModule {

}
