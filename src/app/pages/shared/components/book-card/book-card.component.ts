import { Component, effect, input } from '@angular/core';
import { Book } from '../../../../shared/services/Types';
import { environment } from '../../../../../environments/environment';
import { RouterModule } from '@angular/router';
import { BookService } from '../../../../shared/services/books.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { BookFavComponent } from '../book-fav/book-fav.component';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BookFavComponent
  ],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {
  bookData = input<Book>();
  coverBaseURL: string = environment.coverBaseUrl;
  coverURL: string = '';

  constructor(private bookService:BookService, private messageService:MessageService){}

  // set the default image when an error occurs
  setDefaultImage(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/imgs/logo.png';  // I will use the logo but instead we have to get a default image
  }

}
