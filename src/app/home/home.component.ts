import {Component, OnInit} from '@angular/core';
import {RangeService} from '../range.service';
import {Row} from '../row.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    rows:Row [];

    constructor(private rangeService:RangeService) {
    }

    ngOnInit() {
        this.getRows();
        this.reset();
    }

    getRows(color:string = 'table-success') {
        this.rangeService.getRows(color).subscribe(
            dados => {
                this.rows = dados;
            });
    }

    paint(event) {
        if (event.target.value) {
            this.getRows('table-default');
            this.rangeService.paint(this.rangeService.getRange(+event.target.value).intervals);
        }
    }

    reset() {
        this.getRows();
        this.rangeService.paint(this.rangeService.getRange(1).intervals);
    }
}
