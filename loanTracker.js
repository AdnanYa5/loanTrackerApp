import {
    LightningElement,
    track
} from 'lwc';

export default class LoanTracker extends LightningElement {
    outLoanAmt;
    perMonthAmt;
    monInterest;
    noMonPayOff;
    totalPayment;

    handleClickSubmit(event) {
        var inp = this.template.querySelectorAll("lightning-input");

        inp.forEach(element => {
            if (element.name == "outLoanAmtInput") {
                this.outLoanAmt = element.value;
            } else if (element.name == "perMonAmtInput") {
                this.perMonthAmt = element.value;
            } else if (element.name == "monInterestInput") {
                this.monInterest = element.value;
            }
        });

        //console.log('outLoanAmt---' + this.outLoanAmt);
        //console.log('perMonthAmt---' + this.perMonthAmt);
        //console.log('monInterest---' + this.monInterest);

        this.calculateLoanPayment();
        this.template.querySelector("c-loan-chart").loadChart();
    }

    calculateLoanPayment(){
        var interestAmt = (this.monInterest / 12) * this.outLoanAmt;
        //console.log('interestAmt--'+interestAmt);
        this.totalPayment = parseFloat(this.outLoanAmt) + parseFloat(interestAmt);
        this.noMonPayOff = Math.ceil(this.totalPayment / this.perMonthAmt);

    }
}