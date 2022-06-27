import { LayoutSkeletonModule } from './layout/skeleton/module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { DatePipe, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AppPagesIndexModule } from './pages/index';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { BasicJwtService } from './services/basicjwt';
registerLocaleData(en);

const assets = [
  LayoutSkeletonModule,
  AppPagesIndexModule
];

const route = [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return sessionStorage.getItem('accessToken');
        },
        allowedDomains: ['https://maiora-life-sciences.herokuapp.com/api/'],
        disallowedRoutes: ['https://maiora-life-sciences.herokuapp.com/api/reglogin/login']
      }
    }),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(route, { useHash: true, relativeLinkResolution: 'legacy' }),
    assets,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: BasicJwtService, multi: true },
    DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
