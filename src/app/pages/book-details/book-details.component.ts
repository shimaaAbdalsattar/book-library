import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { QueryService } from '../../shared/services/query.service';
import { Book } from '../../shared/services/Types';
import { apiBase } from '../../shared/services/constants';
import { BookService } from '../../shared/services/books.service';
import { environment } from '../../../environments/environment';
import { BookFavComponent } from '../shared/components/book-fav/book-fav.component';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BookFavComponent
  ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {
  private destroy$ = new Subject<void>();
  private bookKey:string|null = '';
  isLoading:boolean = true;
  bookDetails: Book|null = null;
  coverBaseURL: string = environment.coverBaseUrl;
  

  constructor(
    private route:ActivatedRoute,
    private queryService:QueryService,
    private bookService:BookService
  ){
    // *************************
    // Supposed to have an api take the identifier of book and returns book details
    // api "https://openlibrary.org/works/book_Key.json" for example doesn't return all needed data
    // for that I will depend on the retreived list on home page
    // *************************
    this.bookKey = this.route.snapshot.paramMap.get('key');
    /*this.queryService.get(`${apiBase}${this.bookKey}`).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res)=> {
        this.bookDetails = res;
        this.isLoading = false;
        console.log(this.bookDetails);
      },
      error: (er)=> {
        this.isLoading = false;
        this.bookDetails = null;
      }
   });*/
   this.bookDetails = this.bookService.getBookByKey(this.bookKey!);
  }

  // set the default image when an error occurs
  setDefaultImage(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/imgs/logo.png';  // I will use the logo but instead we have to get a default image
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
