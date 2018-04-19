import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from './category.service';
import { Category } from './category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[];
  category: Category;
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
    this.category = new Category();
  }

  getCategories() {
    this.categoryService.getAll().subscribe(categories => this.categories = categories);
  }

  onSubmit(categoryForm: NgForm) {
    if (this.category.id) {
      this.categoryService.put(this.category).subscribe();
    } else {
      this.categoryService.post(this.category).subscribe(c => this.categories.push(c));
    }
    this.reset();
  }

  reset() {
    this.category = new Category();
  }

  edit(category: Category) {
    this.category = category;
  }

  delete(category: Category) {
    this.categoryService.delete(category).subscribe();
    this.categories.splice(this.categories.indexOf(category), 1);
  }
}
