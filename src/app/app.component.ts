import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  ApplicationContext,
  AUTH_VIEW,
  ContextActionListencer,
  ContextDataItem,
  ContextEvents,
} from './utils/context/applicationContext';
import als_summary from './data/als-summary.json';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'mls-ui';
  pageTitle = '';
  hasLoggedIn = false;
  loggedIn :any;
  accessToken : any
  isuserLoggedIn: boolean = false;

  constructor(
    private context: ApplicationContext,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    ) { }

  ngOnInit() {

    const token = this.context.getToken();
    if(token) {
      this.isuserLoggedIn = true;
      // this.router.navigate(['./client'])
    } else {
      this.isuserLoggedIn = false;
      this.router.navigate([``]);
    }


    this.loggedIn = this.context.getData(ContextDataItem.LOGGEDIN);
    console.log(this.loggedIn);
    this.initApp();
    this.pageTitle = this.context.getData(ContextDataItem.PAGE_TITLE);
    this.listenToContext();
    console.log(this);
  }

  ngAfterViewInit() { }

  private initApp() {
    ApplicationContext.initApplicatioContext();

    if (!this.context.getData(ContextDataItem.BREADCRUMB)) {
      this.context.setData(ContextDataItem.BREADCRUMB, 'breadcrumb');
    }

    /** ALS - Summary List Data */
    if (!this.context.getData(ContextDataItem.ALS_SUMMARY)) {
      this.context.setData(ContextDataItem.ALS_SUMMARY, als_summary);
    }
    
  }

  private listenToContext() {
    this.context.listener.subscribe((res: ContextActionListencer) => {
      if (res && res.event === ContextEvents.VALUDE_CHANGED) {

        if (res.data.key === ContextDataItem.PAGE_TITLE) {
          this.pageTitle = res.data.value;
          this.cdRef.markForCheck();
          // return;
        }

        if (res.data.key === ContextDataItem.LOGGEDIN) {
          this.hasLoggedIn = res.data.value;
          this.cdRef.markForCheck();
          // return;
        }

        if (res.data.key === ContextDataItem.AUTH_VIEW) {
          this.hasLoggedIn = res.data.value === AUTH_VIEW.LOGIN ? false : true;
          this.cdRef.markForCheck();
          // return;
        }
        if (res.data.key === ContextDataItem.ACCESSTOKEN) {
          this.accessToken = res.data.value;
          console.log(this.accessToken);
          this.cdRef.markForCheck();
          // return;
        }
      }

    });
  }

  // private isUserLoggedIn() {
  //   this.isuserLoggedIn  = sessionStorage.getItem("accessToken");
  //   console.log(this.isuserLoggedIn);
  //   this.cdRef.markForCheck();
  // }
}
