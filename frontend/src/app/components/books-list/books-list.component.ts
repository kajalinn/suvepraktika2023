import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import {Observable, tap} from 'rxjs';
import { Page } from '../../models/page';
import { Book } from '../../models/book';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  books$!: Observable<Page<Book>>;
  pageIndex = 0;
  totalPages = 0;

  constructor(
    private bookService: BookService,
  ) {
  }

  ngOnInit(): void {
    // TODO this observable should emit books taking into consideration pagination, sorting and filtering options.
    this.getBooks();
  }

  getBooks(): void {
    this.books$ = this.bookService.getBooks({pageIndex: this.pageIndex})
      .pipe(tap(page => {
        this.totalPages = page.totalPages;
      }));
  }

  nextPage(): void {
    if (this.pageIndex < this.totalPages - 1) {
      this.pageIndex++;
      this.getBooks();
    }
  }

  previousPage(): void {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.getBooks();
    }
  }

  isPreviousDisabled(): boolean {
    return this.pageIndex === 0;
  }

  isNextDisabled(): boolean {
    return this.pageIndex === this.totalPages - 1;
  }

}
