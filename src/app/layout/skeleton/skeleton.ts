import { ChangeDetectorRef, Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationContext, ContextActionListencer, ContextDataItem, ContextEvents } from '../../../app/utils/context/applicationContext';

/**
 * Placeholder component of the App Structure
 */

@Component({
    selector: 'layout-skeleton',
    templateUrl: './skeleton.html',
    styleUrls: ['./skeleton.scss']
})
export class LayoutSkeletonComponent implements OnInit, OnDestroy {
    isCollapsed = false;

    pageTitle = '';

    breadCrumb?: Array<{ title?: string, path?: string, icon?: string }> = [];
    // breadCrumb = '';
    link = '';

    constructor(
        private cdRef: ChangeDetectorRef,
        private context: ApplicationContext,
        private _router: Router
    ) { }

    ngOnInit() {
        this.initActions();
    }

    private initActions() {
        // TODO
        // 2. Build Breadcrumb by listening to the active Route
        this.pageTitle = this.context.getData(ContextDataItem.PAGE_TITLE);
        this.breadCrumb = this.context.getData(ContextDataItem.BREADCRUMB);
        this.link = this.context.getData(ContextDataItem.ROUTERLINKBC);
        this.cdRef.markForCheck();

        this.listenToContext();
    }

    private listenToContext() {
        this.context.listener.subscribe((res: ContextActionListencer) => {
            if (res && res.event === ContextEvents.VALUDE_CHANGED) {
                if (res.data.key === ContextDataItem.PAGE_TITLE) {
                    this.pageTitle = res.data.value;
                    this.cdRef.detectChanges();
                    // return;
                }
                if (res.data.key === ContextDataItem.BREADCRUMB) {
                    this.breadCrumb = res.data.value;
                    this.cdRef.detectChanges();
                    // return;
                }
                if (res.data.key === ContextDataItem.ROUTERLINKBC) {
                    this.link = res.data.value;
                    console.log(this.link);
                    this.cdRef.detectChanges();
                    // return;
                }
            }
        });
    }

    logout() {
        localStorage.removeItem('accessToken');
        sessionStorage.removeItem('accessToken');
        localStorage.clear();
        sessionStorage.clear();
        this.context.destroySession();
        window.location.reload();
        // this._router.navigate([``]);
        this._router.navigate([''])
        // .then(() => {
        //     window.location.reload();
        // });
    }

    ngOnDestroy() {
        if (this.context && this.context.listener) {
            try {
                this.context.listener.unsubscribe();
                this.cdRef.markForCheck();
            } catch (e) { }
        }
    }

    goToDashboard() {
        this._router.navigate(['/dashboard']);
    }
}
