import { LightningElement, api } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';

export default class LoanChart extends LightningElement {
    chartInitialized = false;
    @api totalPayment;
    @api principalAmt;
    //interestAmt = Float.parse(this.totalPayment) - Float.parse(this.principalAmt);

    get interestAmt(){
        return isNaN(this.totalPayment - this.principalAmt) ? 0 : this.totalPayment - this.principalAmt;
    }

    @api loadChart(){
        console.log('Load Chart---');
        if(this.chartInitialized){
            return;
        }
        this.chartInitialized = true;
        Promise.all([
            loadScript(this, 'https://code.highcharts.com/highcharts.js')
        ]).then(() => {
            this.initializeChart();
        }).catch(error => {
            console.error(error);
        })
    }

    initializeChart(){
        let container = this.template.querySelector('.chartContainer');
        Highcharts.chart(container, {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Percentage distribution'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: 'Amount',
                colorByPoint: true,
                data: [{
                    name: 'Principal Amount',
                    y: (this.principalAmt*100)/this.totalPayment,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Interest Amount',
                    y: 100 - ((this.principalAmt*100)/this.totalPayment)
                }]
            }]
        });
    }
    
}
