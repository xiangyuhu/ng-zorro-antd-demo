import { NgModule } from '@angular/core';
import { LayoutDefaultComponent } from './default.component';
import {SharedModule} from '../share/share.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';

const COMPONENTS = [
  LayoutDefaultComponent,
];

@NgModule({
  imports: [SharedModule, NgZorroAntdModule],
  providers: [],
  declarations: [
    ...COMPONENTS,
  ],
  exports: [
    ...COMPONENTS,
  ]
})
export class LayoutModule { }
