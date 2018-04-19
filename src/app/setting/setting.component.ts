import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, RequiredValidator } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/from';
import { Observable } from 'rxjs/Observable';

import { Column } from '../column/column.model';
import { SettingService } from './setting.service';
import { Setting } from './setting.model';
import { ColumnService } from '../column/column.service';
import { Type } from '../type/type.model';
import { Category } from '../category/category.model';
import { CategoryService } from '../category/category.service';
import { TypeService } from '../type/type.service';
import { Cell } from '../home/cell.model';
import { Row } from '../home/row.model';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  rows: Row[];
  columns: Column[];
  types: Type[];
  categories: Category[];
  cells: Cell[] = [];
  colors = [
    { name: 'bg-primary', selected: false },
    { name: 'bg-secondary', selected: false },
    { name: 'bg-success', selected: false },
    { name: 'bg-warning', selected: false },
    { name: 'bg-danger', selected: false },
    { name: 'bg-info', selected: false },
    { name: 'bg-dark', selected: false }
  ];
  color: any;
  originColor: string;
  overColor: string;
  setting: Setting;
  settingForm: FormGroup;
  columnControl: FormControl;
  column: Column;
  chipColumn = false;
  typeControl: FormControl;
  type: Type;
  chipType = false;
  categoryControl: FormControl;
  category: Category;
  chipCategory = false;
  isInvalid = true;
  constructor(
    private settingService: SettingService,
    private columnService: ColumnService,
    private typeService: TypeService,
    private categoryService: CategoryService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.getRows();
    this.setting = new Setting();
    this.columnControl = this.fb.control('');
    this.typeControl = this.fb.control('');
    this.categoryControl = this.fb.control('');
    this.settingForm = this.fb.group({
      columnControl: this.columnControl,
      categoryControl: this.categoryControl,
      typeControl: this.typeControl,
      columnHdControl: this.fb.control('', Validators.required),
      categoryHdControl: this.fb.control('', Validators.required),
      typeHdControl: this.fb.control('', Validators.required),
      colorControl: this.fb.control('', Validators.required),
      cellControl: this.fb.control('', Validators.required)
    });
    this.columnControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap(searchTerm => searchTerm ? this.columnService
        .search(searchTerm)
        .catch(error => Observable.from([])) : Observable.from([]))
      .subscribe(cols => this.columns = cols);
    this.typeControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap(searchTerm => searchTerm ? this.typeService
        .search(searchTerm)
        .catch(error => Observable.from([])) : Observable.from([]))
      .subscribe(x => this.types = x);
    this.categoryControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap(searchTerm => searchTerm ? this.categoryService
        .search(searchTerm)
        .catch(error => Observable.from([])) : Observable.from([]))
      .subscribe(x => this.categories = x);
  }

  getRows() {
    this.settingService.getRows().subscribe(rows => this.rows = rows);
  }

  getColumns() {
    this.columnService.getAll().subscribe(columns => this.columns = columns);
  }

  onClick(name: string) {
    this.color = this.colors.find(x => x.name === name);
    this.color.selected = !this.color.selected;
    this.colors.forEach((cor) => {
      if (cor.name !== name) {
        cor.selected = false;
      }
    });
    this.settingForm.get('colorControl').setValue(this.color.name);
  }

  selectColor(cell: Cell) {
    if (this.color && this.color.name) {
      cell.color = this.color.name;
      this.originColor = this.color.name;
      if (this.cells.indexOf(cell) === -1) {
        this.cells.push(cell);
      }
      this.settingForm.get('cellControl').setValue(this.cells.length);
    }
  }

  onOver(cell: Cell) {
    if (this.color && this.color.name) {
      this.originColor = cell.color;
      this.overColor = this.color.name;
      cell.color = this.color.name;
    }
  }

  onOut(cell: Cell) {
    if (this.color && this.color.name && this.originColor !== this.overColor) {
      cell.color = this.originColor;
    } else if (this.color && this.color.name && this.originColor === this.overColor) {
      cell.color = this.overColor;
    }
  }

  checkColumn(column: Column) {
    this.column = column;
    this.columnControl.setValue('');
    this.settingForm.get('columnHdControl').setValue(this.column.id);
    this.columnControl.disable();
    this.columns = [];
    this.chipColumn = true;
    this.checkUpdate();
  }

  closeColumn() {
    this.columnControl.enable();
    this.settingForm.get('columnHdControl').setValue('');
    this.chipColumn = false;
  }

  checkType(type: Type) {
    this.type = type;
    this.typeControl.setValue('');
    this.settingForm.get('typeHdControl').setValue(this.type.id);
    this.typeControl.disable();
    this.types = [];
    this.chipType = true;
    this.checkUpdate();
  }

  closeType() {
    this.typeControl.enable();
    this.settingForm.get('typeHdControl').setValue('');
    this.chipType = false;
  }

  checkCategory(category: Category) {
    this.category = category;
    this.categoryControl.setValue('');
    this.settingForm.get('categoryHdControl').setValue(this.category.id);
    this.categoryControl.disable();
    this.categories = [];
    this.chipCategory = true;
    this.checkUpdate();
  }

  closeCategory() {
    this.categoryControl.enable();
    this.settingForm.get('categoryHdControl').setValue('');
    this.chipCategory = false;
  }

  reset() {
    this.color = {};
    this.colors.forEach((cor) => {
      cor.selected = false;
    });
    this.columnControl.enable();
    this.chipColumn = false;
    this.categoryControl.enable();
    this.chipCategory = false;
    this.typeControl.enable();
    this.chipType = false;
    this.getRows();
    this.settingForm.reset();
  }

  save() {
    this.setting.cells = this.cells;
    this.setting.columnId = this.column.id;
    this.setting.column = this.column;
    this.setting.typeId = this.type.id;
    this.setting.type = this.type;
    this.setting.categoryId = this.category.id;
    this.setting.category = this.category;
    if (this.setting.id) {
      this.settingService.put(this.setting).subscribe(x => console.log(x));
    } else {
      this.settingService.post(this.setting).subscribe(x => console.log(x));
    }
    this.reset();
  }

  checkUpdate() {
    if (this.column && this.type && this.category) {
      this.settingService.isExist(this.column.id, this.type.id, this.category.id).subscribe(x => this.matchColor(x));
    }
  }

  matchColor(settings: Setting[]) {
    if (settings.length) {
      this.setting = settings.shift();
      this.settingForm.get('columnHdControl').setValue(this.setting.columnId);
      this.settingForm.get('typeHdControl').setValue(this.setting.typeId);
      this.settingForm.get('categoryHdControl').setValue(this.setting.categoryId);
      this.rows.forEach(r => {
        this.setting.cells.forEach(c => {
          const cell = r.cells.find(x => x.name === c.name);
          if (cell) {
            cell.color = c.color;
            this.cells.push(cell);
          }
        });
      });
      this.settingForm.get('cellControl').setValue(this.cells.length);
      this.settingForm.get('colorControl').setValue('edit');
    }
  }

  delete() {
    this.settingService.delete(this.setting).subscribe(x => console.log(x));
    this.reset();
  }
}
