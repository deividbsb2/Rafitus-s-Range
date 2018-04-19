import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TypeService } from './type.service';
import { Type } from './type.model';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {
  types: Type[];
  type: Type;

  constructor(private typeService: TypeService) { }

  ngOnInit() {
    this.getTypes();
    this.type = new Type();
  }

  getTypes() {
    this.typeService.getAll().subscribe(types => this.types = types);
  }

  onSubmit(typeForm: NgForm) {
    if (this.type.id) {
      this.typeService.put(this.type).subscribe(c => console.log(c));
    } else {
      this.typeService.post(this.type).subscribe(c => this.types.push(c));
    }
    this.reset();
  }

  reset() {
    this.type = new Type();
  }

  edit(type: Type) {
    this.type = type;
  }

  delete(type: Type) {
    this.typeService.delete(type).subscribe();
    this.types.splice(this.types.indexOf(type), 1);
  }
}
