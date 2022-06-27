import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

import { Component, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApplicationContext, AUTH_VIEW, ContextActionListencer, ContextDataItem, ContextEvents } from 'src/app/utils/context/applicationContext';
import { LoginService } from 'src/app/services/loginservice';


@Component({
    selector: 'app-page-auth',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})
export class AppAuthPageComponent implements AfterViewInit {

    username: any;

    password: any;


    validateForm: FormGroup;

    hasLoggedIn = false;
    showLogin = false;
    resData: any;

    constructor(
        private ctx: ApplicationContext,
        private cdRef: ChangeDetectorRef,
        private router: Router,
        private message: NzMessageService,
        private loginservice: LoginService
    ) { }


    ngAfterViewInit() {
        console.log(this);
        this.ctx.setData(ContextDataItem.PAGE_TITLE, 'Authentication');
        this.ctx.setData(ContextDataItem.BREADCRUMB, 'Authentication');
        this.listenToContext();
        const authView = this.ctx.getData(ContextDataItem.AUTH_VIEW);
        if (authView === AUTH_VIEW.LOGOUT || this.hasLoggedIn) {
            this.logout();
        }
    }


    private listenToContext() {
        this.ctx.listener.subscribe((res: ContextActionListencer) => {

            switch (res.event) {
                case ContextEvents.VALUDE_CHANGED:
                    if (res.data.key === ContextDataItem.LOGGEDIN) {
                        this.hasLoggedIn = res.data.value;
                        //   this.manageRouting();
                    }
            }
        }, err => {
            // console.log('Error', err);
        });
    }

    reset() {
        this.username = "";
        this.password = "";
        this.cdRef.markForCheck();
    }

    logout() {
        this.message.info(`Clearing sessions data of "${this.ctx.getData(ContextDataItem.USERNAME)}", before logging out`);
        setTimeout(() => {
            this.ctx.setData(ContextDataItem.USERNAME, null);
            //this.ctx.setData(ContextDataItem.LOGGEDIN, false);
            this.ctx.setData(ContextDataItem.AUTH_VIEW, AUTH_VIEW.LOGIN);
        }, 2000);
        return;
    }

    // login() {
    //     console.log(this,this.username, this.password);
    //     if (!this.username || !this.username.length) {
    //         this.message.warning(`Provid valid username`);
    //         return;
    //     }
    //     if (!this.password || !this.password.length) {
    //         this.message.warning(`Provid valid password`);
    //         return;
    //     }

    //     this.message.success(`A tempory user session has created, for "${this.username}"`);

    //     setTimeout(() => {
    //         this.ctx.setData(ContextDataItem.USERNAME, this.username);
    //         this.ctx.setData(ContextDataItem.LOGGEDIN, true);
    //         // this.ctx.setData(ContextDataItem.AUTH_VIEW, AUTH_VIEW.LOGOUT);
    //         this.router.navigate(['./client']);
    //     }, 2000);
    // }



    login() {
        if (!this.username || !this.username.length) {
            this.message.warning(`Provid valid username`);
            return;
        }
        if (!this.password || !this.password.length) {
            this.message.warning(`Provid valid password`);
            return;
        }
        const model =
        {
            "userName": this.username,
            "password": this.password
        }
        this.loginservice.login(model).subscribe(res => {
            this.resData = res;
            if (res.statusCode === 200) {
                this.message.success(` Welcome "${this.username}"`);
                this.ctx.setData(ContextDataItem.ACCESSTOKEN, res['metaData']['token']);
                console.log(res, this);
                // this.router.navigate(['./client']);
                this.router.navigate(['./dashboard'])
                .then(() => {
                    window.location.reload();
                });
            } 
        }, (err) => {
            this.message.warning(`Login Failed Please enter Valid Credentials`);
        }
        
        );


    }


    role(role) {
        this.showLogin = true;
        console.log(role, this);
    }
    back() {
        this.reset();
        this.showLogin = false;
    }
}
