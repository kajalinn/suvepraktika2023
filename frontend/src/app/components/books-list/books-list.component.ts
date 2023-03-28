import {Component, OnInit, ViewChild} from '@angular/core';
import { BookService } from '../../services/book.service';
import {Observable, tap} from 'rxjs';
// import {MatSort} from '@angular/material/sort';
import { Page } from '../../models/page';
import { Book } from '../../models/book';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {
  // @ViewChild(MatSort, {static: true}) sort!: MatSort;
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
    // this.sortBooks();
  }

  // sortBooks(): void {
  //   function compare(a: string | number | boolean, b: string | number | boolean, isAsc: boolean): number {
  //     return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  //   }
  //   this.books$.subscribe(books => {
  //     this.sort.sortChange.subscribe(() => books.content.sort((a, b) => {
  //       const isAsc = this.sort.direction === 'asc';
  //       switch (this.sort.active) {
  //         case 'title': return compare(a.title, b.title, isAsc);
  //         case 'genre': return compare(a.genre, b.genre, isAsc);
  //         case 'status': return compare(a.status, b.status, isAsc);
  //         default: return 0;
  //       }
  //     }));
  //   });
  //   this.getBooks();
  // }

  getBooks(): void {
    this.books$ = this.bookService.getBooks({pageIndex: this.pageIndex})
      .pipe(tap(page => {
        this.totalPages = page.totalPages;
      }));

  }

  // onChangePage(pe: PageEvent){
  //   this.nextPage();
  //   this.previousPage();
  // }

  nextPage(): void {
    if (this.pageIndex < this.totalPages - 1) {
      this.pageIndex++;
    }
    this.getBooks();
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
