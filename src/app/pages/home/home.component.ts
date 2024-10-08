import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookCardComponent } from '../shared/components/book-card/book-card.component';
import { Observable, Subject, takeUntil } from 'rxjs';
import { QueryService } from '../../shared/services/query.service';
import { apiSubjects } from '../../shared/services/constants';
import { Book } from '../../shared/services/Types';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { BookService } from '../../shared/services/books.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    BookCardComponent,
    LoaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private destroy$ = new Subject<void>();
  booksList: Book[] = [];
  isLoading:boolean = true;

  constructor(
    private queryService:QueryService,
    private bookService:BookService
  ){
    this.queryService.get(`${apiSubjects}/finance.json`).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res)=> {
        this.booksList = res.works.slice(0, 9);
        this.bookService.setBooksList(this.booksList);
        this.isLoading = false;
        console.log(this.booksList);
      },
      error: (er)=> {
        this.isLoading = false;
        this.booksList = [];
      }
   });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
