import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoContentComponent } from './component';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { AlertOutline } from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [ AlertOutline ];


@NgModule({
  declarations: [NoContentComponent],
  imports: [
    CommonModule,
    NzIconModule.forRoot(icons),
  ],
  exports: [NoContentComponent]
})
export class NoContentModule { }
