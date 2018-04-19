import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Row } from './row.model';
import { RangeService } from './range.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    rows: Row[];
    rangeForm: FormGroup;
    constructor(private rangeService: RangeService, private fb: FormBuilder) {
    }
    ngOnInit() {
        this.getRows();
        this.reset();
        this.rangeForm = this.fb.group({
            s4bbs: '',
            cs4bbs: ''
        });
    }

    getRows(color: string = 'table-success') {
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
