export enum PageStatus {
    LOADING = 1,
    READY = 2,
}

export enum PageAction {
    SUCCESS = 1,
    FAILED = 2,
    INFO = 3
}

export class PageManager {
    message?: string;
    status?: PageStatus;
    action?: PageAction;

    constructor(
        message = '',
        status = PageStatus.LOADING,
        action = PageAction.SUCCESS
    ) {
        this.message = message;
        this.status = status;
        this.action = action;
    }

    public static getStatusColor(status) {
        switch (status) {
            case 'SUCCESS': return '#827f81';
            case 'FAILED': return '#f30909';
            case 'NONE': return '#bfa90b';
            case 'PROGRESS': return '#4caf50';
        }
    }

    /**
     * Utility function to show the page is loading
     * @param pageObj PageManager
     */
    public static showLoading(pageObj: PageManager) {
       
        pageObj.action = PageAction.INFO;
        pageObj.status = PageStatus.LOADING;
    }
}


