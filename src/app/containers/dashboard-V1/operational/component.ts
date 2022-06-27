import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Chart from 'chart.js';
import { ChartDataSets, ChartOptions, ChartType, RadialChartOptions } from 'chart.js';
import { Label, Color, SingleDataSet } from 'ng2-charts';

@Component({
    selector: 'app-logix-insights-operational-container',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})
export class AppOperationalPageComponent implements OnInit {

    _dashboardListData = [];
    canvas: any;
    ctx: any;
    constructor(
        private cdRef: ChangeDetectorRef,
        private router: Router
    ) { }

    ngOnInit() {
        this._dashboardListData = [
            {
                id: 1,
                name: 'Pending Receipts',
                value: 8,
                iconBgColor: '#ACC857',
                iconColor: '#fff',
                key: 'inborder',
                iconType: 'reconciliation',
                calculation: '12.5%'
            },
            {
                id: 2,
                name: 'Outbound Orders',
                value: '25',
                iconBgColor: '#8CC2E6',
                iconColor: '#fff',
                key: 'putorder',
                iconType: 'dollar',
                calculation: '10%'
            },
            {
                id: 3,
                name: 'Warehouses',
                value: 23,
                iconBgColor: '#EDC13F',
                iconColor: '#fff',
                key: 'mvins',
                iconType: 'home',
                calculation: '23%'
            },
            {
                id: 4,
                name: 'Pending Tasks',
                value: 13,
                iconBgColor: '#DD6566',
                iconColor: '#fff',
                key: 'outborder',
                iconType: 'file-search',
                calculation: '7.6%'
            }
        ];
        this.cdRef.markForCheck();
        this.canvas = document.getElementById('myChart');
        // this.ctx = this.canvas.getContext('2d');
    }

    public pieChartOptions: ChartOptions = {
        responsive: true,
      };
      public pieChartLabels: Label[] = [['AAI-MNL'], ['AAI-CEB'], ['A2Z-MNL']];
      public pieChartData: SingleDataSet = [226000, 220000, 113000];
      public pieChartType: ChartType = 'pie';
      public pieChartLegend = true;
      public pieChartPlugins = [];
      public chartColors: Array<any> = [
        {
          backgroundColor: ['#8fb129', '#a6bb67', '#c7d69c'],
          hoverBackgroundColor: ['#8fb129', '#a6bb67', '#c7d69c'],
          borderWidth: 2,
        }
      ];

      public lineChartData: ChartDataSets[] = [
        { data: [8, 15, 10, 7, 25, 22, 33, 14, 18, 30, 27, 20], label: 'India' },
      { data: [25, 19, 15, 9, 15, 20, 6, 18, 20, 13, 15, 23], label: 'USA' }
      ];
      public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      public lineChartColors: Color[] = [
        {
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: '#8cc2e6',
          borderWidth: 2,
        },
        {
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: '#dd6566',
          borderWidth: 2,
        }
      ];
      public lineChartLegend = true;
      public lineChartType = 'line';
      public lineChartPlugins = [];


      public radarChartOptions: RadialChartOptions = {
        responsive: true,
      };
      public radarChartLabels: Label[] = ['Orders', 'Pickup', 'In Manaintainance', 'Profit', 'On the Move', 'Shipment', 'Managemnet'];

      public radarChartData: ChartDataSets[] = [
        { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
      ];
      public radarChartType: ChartType = 'radar';


      public barChartOptions: ChartOptions = {
        responsive: true,
      };
      public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
      public barChartType: ChartType = 'bar';
      public barChartLegend = true;
      public barChartPlugins = [];

      public barChartData: ChartDataSets[] = [
        { data: [6, 5, 5, 9, 8, 5, 3, 1, 5, 6, 5, 8], label: 'INBOUND' },
        { data: [2, 5, 4, 8, 4, 3, 5, 9, 8, 6, 2, 7], label: 'OUTBOUND' }
      ];

    cardClicked(event) {
        if (!event) {
            return;
        }
        console.log(event);
    }
}
