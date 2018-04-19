import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Column } from './column.model';
import { ColumnService } from './column.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnInit {

  columns: Column[];
  column: Column;
  constructor(private columnService: ColumnService) { }

  ngOnInit() {
    this.getColumns();
    this.column = new Column();
  }

  getColumns() {
    this.columnService.getAll().subscribe(columns => this.columns = columns);
  }

  onSubmit(columnForm: NgForm) {
    if (this.column.id) {
      this.columnService.put(this.column).subscribe(c => console.log(c));
    } else {
      this.columnService.post(this.column).subscribe(c => this.columns.push(c));
    }
    this.reset();
  }

  reset() {
    this.column = new Column();
  }

  edit(column: Column) {
    this.column = column;
  }

  delete(column: Column) {
    this.columnService.delete(column).subscribe();
    this.columns.splice(this.columns.indexOf(column), 1);
  }
}
