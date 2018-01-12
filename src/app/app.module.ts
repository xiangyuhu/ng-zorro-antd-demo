import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';


import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LayoutModule } from './layout/layout.module';
import { RoutesModule } from './routes/routes.module';
import {SharedModule} from './share/share.module';

import { AppComponent } from './app.component';
import {DefaultInterceptor} from '@core/net/default.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutesModule,
    LayoutModule,
    SharedModule,
    NgZorroAntdModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
