import { Component, OnInit } from '@angular/core';
import { SettingService } from '../setting/setting.service';
import { Row } from '../home/row.model';
import { ColumnService } from '../column/column.service';
import { Column } from '../column/column.model';
import { Type } from '../type/type.model';
import { Setting } from '../setting/setting.model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  rows: Row[];
  columns: Column[];
  settings: Setting[];
  cols: any = [];
  rangeForm: FormGroup;
  constructor(
    private settingService: SettingService,
    private columnService: ColumnService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.rangeForm = this.fb.group({});
    this.settingService.getRows().subscribe(rows => this.rows = rows);
    this.columnService.getAll().subscribe(
      x => this.columns = x,
      error => console.log(error),
      () => this.settingService.getAll().subscribe(
        s => this.settings = s,
        error => console.log(error),
        () => this.runTable())
    );
  }

  runTable() {
    this.columns.forEach(col => {
      const setts = this.settings.filter(s => {
        return s.columnId === col.id;
      });
      const tps = setts.map(t => {
        return t.type;
      });
      const uTps = [];
      tps.forEach(tp => {
        if (uTps.find(x => x.id === tp.id)) {
          return;
        }
        uTps.push(tp);
      });
      const ts = uTps.map(u => {
        return { column: col, type: u };
      });
      this.cols.push(ts);
    });
    this.cols.forEach(col => {
      col.forEach(item => {
        const setts = this.settings.filter(t => {
          return t.columnId === item.column.id && item.type.id === t.typeId;
        });
        const cat = setts.map(s => {
          return s.category;
        });
        item.type.categories = cat;
        const name = `${item.column.id}-${item.type.id}-${item.type.name}`;
        this.rangeForm.addControl(name, new FormControl());
      });

    });
  }

  getCol(index: number) {
    return this.cols.map(c => {
      return c[index];
    });
  }

  paint(columnId: number, typeId: number, event: any) {
    const categoryId = +event.target.value;
    const setting = this.settings.find(e => e.columnId === columnId && e.typeId === typeId && e.categoryId === categoryId);
    this.settingService.getRows().subscribe(
      rows => this.rows = rows,
      error => console.log(),
      () => {
        this.rows.forEach(r => {
          setting.cells.forEach(c => {
            const cell = r.cells.find(x => x.name === c.name);
            if (cell) {
              cell.color = c.color;
            }
          });
        });
      });
    this.rangeForm.reset();
    this.rangeForm.get(this.getControlName(setting)).setValue(categoryId);
  }

  getControlName(col) {
    return `${col.column.id}-${col.type.id}-${col.type.name}`;
  }

  reset() {
    this.settingService.getRows().subscribe(rows => this.rows = rows);
    this.rangeForm.reset();
  }
}
