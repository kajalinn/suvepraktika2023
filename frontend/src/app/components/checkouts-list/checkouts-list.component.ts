import { Component, OnInit } from '@angular/core';
import {Observable, tap} from 'rxjs';
import { Page } from '../../models/page';
import {Checkout} from "../../models/checkout";
import {CheckoutService} from "../../services/checkout.service";

@Component({
  selector: 'app-checkouts-list',
  templateUrl: './checkouts-list.component.html',
  styleUrls: ['./checkouts-list.component.scss']
})
export class CheckoutsListComponent implements OnInit {

  checkouts$!: Observable<Page<Checkout>>;
  pageIndex = 0;
  totalPages = 0;

  constructor(
    private checkoutService: CheckoutService,
  ) {
  }

  ngOnInit(): void {
    // TODO this observable should emit books taking into consideration pagination, sorting and filtering options.
    this.getCheckouts();

  }

  getCheckouts(): void {
    this.checkouts$ = this.checkoutService.getCheckouts({pageIndex: this.pageIndex})
      .pipe(tap(page => {
        this.totalPages = page.totalPages;
      }));
    console.log(this.checkouts$)
  }
  nextPage(): void {
    if (this.pageIndex < this.totalPages - 1) {
      this.pageIndex++;
    }
    this.getCheckouts();
  }

  previousPage(): void {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.getCheckouts();
    }
  }

  isPreviousDisabled(): boolean {
    return this.pageIndex === 0;
  }

  isNextDisabled(): boolean {
    return this.pageIndex === this.totalPages - 1;
  }




}
