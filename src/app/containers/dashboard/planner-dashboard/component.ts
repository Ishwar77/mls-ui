import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { AlsService } from 'src/app/services/alsService';
import { ClientService } from 'src/app/services/clientService';
// import { FormsService } from 'src/app/services/formsService';

@Component({
    selector: 'app-intelogiz-planner-dashboard-container',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class AppIntelogizDashboardPlannerComponentContainer implements OnInit {

    //charts

    //barchart
    public barChartOptions: ChartOptions = {
        responsive: true,
      };

      public barChartLabels: Label[] = [''];
      public barChartType: ChartType = 'bar';
      public barChartLegend = true;
      public barChartPlugins = [];
    
      public barChartData: ChartDataSets[] = [
        { data: [55], label: 'category A' },
        { data: [60], label: 'category B' },
        { data: [50], label: 'category C' },
        { data: [55], label: 'category D' },
        { data: [95], label: 'category E' },
        { data: [10], label: 'category F' },
        { data: [0], label: '0' },
        // { data: [28, 48, 40, 19, 86, 27], label: 'Series B' }
      ];

      //linechart

      public lineChartData: ChartDataSets[] = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      ];

      public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

      public lineChartOptions: ChartOptions = {
        responsive: true,
      };

      public lineChartColors: Color[] = [
        {
          borderColor: 'black',
          backgroundColor: 'rgba(255,0,0,0.3)',
        },
      ];
      
      public lineChartLegend = true;
      public lineChartType = 'line';
      public lineChartPlugins = [];

      //get clients
      clientData: any = [];
      clientsCount: any;

      //get clients
      studyData: any = [];
      studyCount: any;

     //get clients
      formsData: any = [];
      formsCount: any;
      

      //charts

    _dashboardListData = [];
    constructor(
        private cdRef: ChangeDetectorRef,
        private router: Router,
        private clientservice: ClientService,
        private alsService: AlsService,
        // private formsService: FormsService
    ) { }

    ngOnInit() {
        this.getallforms();
        this.getallstudies() 
        this.getallclient();
    }

    getallclient() {
        this.clientservice.getallclients().subscribe(res => {
            if (res.message === "Success") {
                this.clientData = res['metaData'] ? res['metaData'] : [];
                this.clientsCount = this.clientData.length;
                this.dashboardListData();
            } else {
                // this.message.error('Error');
                console.log("error");
            }
        })
    }

    getallstudies() {
        this.alsService.getallstudies().subscribe(res => {
            if (res.message === "Success") {
                this.studyData = res['metaData'] ? res['metaData'] : [];
                this.studyCount = this.studyData.length;
                this.dashboardListData();
            } else {
                // this.message.error('Error');
                console.log("error");
            }
        })
    }

    getallforms() {
        this.alsService.getallforms().subscribe(res => {
            if (res.message === "Success") {
                this.formsData = res['metaData'] ? res['metaData'] : [];
                this.formsCount = this.formsData.length;
                this.dashboardListData();
            } else {
                // this.message.error('Error');
                console.log("error");
            }
        })
    }


    dashboardListData() {
        this._dashboardListData = [
            {
                id: 1,
                name: 'Clients',
                value: this.clientsCount,
                iconBgColor: 'rgb(112 112 112)',
                iconColor: '#fff',
                key: 'clients',
                img: 'assets/images/inbound.png'
            },
            {
                id: 2,
                name: 'Studies',
                value: this.studyCount,
                iconBgColor: 'rgb(233 131 130)',
                iconColor: '#fff',
                key: 'studies',
                img: 'assets/images/delivery.png'
            },
            {
                id: 3,
                name: 'Users',
                value: 25,
                iconBgColor: 'rgb(239 172 68)',
                iconColor: '#fff',
                key: 'users',
                img: 'assets/images/outboundorders.png'
            },
            {
                id: 4,
                name: 'Forms',
                value: this.formsCount,
                iconBgColor: '#8CBF82',
                iconColor: '#fff',
                key: 'forms',
                img: 'assets/images/overdue-orders.png'
            },
            // {
            //     id: 5,
            //     name: 'Progress',
            //     value: 7,
            //     iconBgColor: 'rgb(76 198 214)',
            //     iconColor: '#fff',
            //     key: 'progress',
            //     img: 'assets/images/movetoInsp.png'
            // },
        ];
        this.cdRef.markForCheck();
    }

    cardClicked(event) {
        if (!event) {
            return;
        }
        if (event['key'] === 'clients') {
            this.router.navigate(['/client']);
            this.cdRef.markForCheck();
        } 
        //else if (event['key'] === 'studies') {
        //     this.router.navigate(['/client/:clientid/als']);
        //     this.cdRef.markForCheck();
        // } 
        
    }
}
