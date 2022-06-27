import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum ContextDataItem {
  LOGGEDIN = 'loggedIn',
  JWT = 'jwt',
  USERNAME = 'username',
  PASSWORD = 'password',
  REDIRECT_URL = 'redirectUrl',
  PAGE_TITLE = 'pageTitle',
  AUTH_VIEW = 'authView',
  BREADCRUMB = 'breadCrumb',
  ROUTERLINKBC = 'routerlinkBC',
  ACCESSTOKEN = 'accessToken',


  CLIENTS = 'clients',
  ALS_SUMMARY = 'als_summary',
  ALS_FOLDER = 'als_folder'
}

export enum AUTH_VIEW {
  LOGIN = 'login',
  LOGOUT = 'logout',
  SIGNUP = 'signup'
}

export enum ContextEvents {
  CONTEXT_INIT = 1,
  VALUDE_CHANGED = 2,
  CONTEXT_DESTROYED = 3,
}

export interface ContextActionListencer {
  event: ContextEvents;
  data: { key: ContextDataItem, value: any };
}

/**
 * The default context data
 */
const defaultContext = {
  loggedIn: false,
  pageTitle: 'Home',
  authView: AUTH_VIEW.LOGIN,
  breadCrumb: 'Home'
};
/**
 * ApplicationContext is an Injectable service, at Root level.
 * This is used to store globally used data.
 * Also supports subscription service, to listen for any changes in them
 *
 * To use, one must be define this, as a dependency in the host constructor
 *
 * Keys:
 * #### loggedIn: boolean
 * #### sessionId: number
 * #### searchText: string
 * #### searchCategory: string
 */

@Injectable({ providedIn: 'root' })
export class ApplicationContext {
  private static data: any = defaultContext;

  public listener: Subject<ContextActionListencer> = new Subject<
    ContextActionListencer
  >();


  public static initApplicatioContext(applicationContext?: any) {
    const d = window.localStorage.getItem('mls-ui');
    let parse = null;
    if (d) {
      parse = JSON.parse(d);
    }
    const localData = parse || applicationContext || defaultContext;
    ApplicationContext.data = localData;

  }

  public getData(key: ContextDataItem) {
    if (!key) {
      return null;
    }

    if (!ApplicationContext.data) {
      ApplicationContext.initApplicatioContext(defaultContext);
    }
    return ApplicationContext.data[key] || null;
  }

  public setData(key: ContextDataItem, value) {
    if (!key) {
      return null;
    }

    if (!ApplicationContext.data) {
      ApplicationContext.initApplicatioContext(defaultContext);
    }

    ApplicationContext.data[key] = value;
    this.notify(ContextEvents.VALUDE_CHANGED, key, value);
    window.localStorage.setItem('mls-ui', JSON.stringify(ApplicationContext.data));
  }

  /**
   * Utility method to send updates to listeners
   * @param event ContextEvents
   * @param dataKey ContextDataItem
   * @param dataValue any
   */
  private notify(event: ContextEvents, dataKey?: ContextDataItem, dataValue?: any) {
    if (!this.listener || !event) {
      return;
    }

    this.listener.next({
      event: event,
      data:
        !dataKey && !dataValue
          ? ApplicationContext.data
          : { key: dataKey, value: dataValue },
    });
    return;
  }

  public destroySession() {
    ApplicationContext.data = {};
    this.notify(ContextEvents.CONTEXT_DESTROYED);
  }
  
  getToken() {
    return sessionStorage.getItem("accessToken");
  }

}
