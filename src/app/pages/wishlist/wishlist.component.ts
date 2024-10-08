import { Component } from '@angular/core';
import { Book } from '../../shared/services/Types';
import { BookService } from '../../shared/services/books.service';
import { BookCardComponent } from '../shared/components/book-card/book-card.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [BookCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  wishlist: Book[] = [];

  constructor(
    private bookService:BookService
  ){
    this.wishlist = this.bookService.getWishlist();
    console.log(this.wishlist);
  }

}
