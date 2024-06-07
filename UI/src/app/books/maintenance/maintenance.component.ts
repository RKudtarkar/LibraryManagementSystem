import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Book, BookCategory } from '../../models/models';
import { ApiService } from '../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface categoryOption {
  displayValue: string;
  value: number;

}

@Component({
  selector: 'maintenance',
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.scss'
})
export class MaintenanceComponent {
  newCategory: FormGroup;
  newBook: FormGroup;
  deleteBook: FormControl;
  categoryOptions: categoryOption[] = [];

  constructor(fb: FormBuilder, private apiService: ApiService, private snakbar: MatSnackBar) {
    this.newCategory = fb.group({
      category: fb.control(''),
      subCategory: fb.control(''),
    });

    this.newBook = fb.group({
      title: fb.control(''),
      author: fb.control(''),
      price: fb.control(0),
      category: fb.control(-1),
    });

    apiService.getCategories().subscribe({
      next: (res: BookCategory[]) => {
        res.forEach((c) => {
          this.categoryOptions.push({
            value: c.id,
            displayValue: `${c.category} / ${c.subCategory}`,
          });
        });
      },
    });

    this.deleteBook = fb.control('');
  }


  addNewCategory() {
    let bookCategory: BookCategory = {
      id: 0,
      category: this.newCategory.get("category")?.value,
      subCategory: this.newCategory.get("subCategory")?.value,
    }

    this.apiService.addNewCategory(bookCategory).subscribe({
      next: (res) => {
        if (res === "cannot insert") {
          this.snakbar.open("already exist!", "OK");
        } else {
          this.snakbar.open("INSERTED", "OK");
        }
      }
    })
  }

  addNewBook() {
    let book: Book = {
      id: 0,
      title: this.newBook.get("title")?.value,
      author: this.newBook.get("author")?.value,
      bookCategoryId: this.newBook.get("category")?.value,
      price: this.newBook.get("price")?.value,
      bookCategory: { id: 0, category: '', subCategory: '' },
      ordered: false
    }

    this.apiService.addNewBook(book).subscribe({
      next: (res) => {
        debugger;
        console.log(res);
        if (res === 'inserted') {
          this.snakbar.open("book added", "OK");
        }
      }
    })
  }

  deleteExistingBook() {
    let id = this.deleteBook.value;
    this.apiService.deleteBook(id).subscribe({
      next: (res) => {
        if (res === 'deleted')
          this.snakbar.open('Book has been Deleted!', 'OK');
      },
      error: (err) => this.snakbar.open('Book does not Exist!', 'OK'),
    });
  }


}
