import { Component, computed, effect, input } from '@angular/core';
import { BookService } from '../../../../shared/services/books.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-book-fav',
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: './book-fav.component.html',
  styleUrl: './book-fav.component.scss'
})
export class BookFavComponent {
  isFav = input<boolean>(false);
  isFav_:boolean = false; 
  bookKey = input<string>();
  isConfirmationDialogVisible: boolean = false;

  constructor( 
    private bookService:BookService,
    private messageService:MessageService){
      effect(() => {
        this.isFav_ = this.isFav();
      })
    }

  toggleFavState() {
    if(!this.isFav_){ // Add to Fav.
      this.isFav_ = true;
      this.bookService.toggleFavoriteState(this.bookKey()  ?? '');
      this.messageService.add({ 
        severity: 'success', 
        summary: 'Success', 
        detail: 'Book has been added to your wishlist.' 
      });
    }
    else{
      this.isConfirmationDialogVisible = true;
    }
  }

  confirmRemoving(){
    this.closeConfirmationDialog();
    this.isFav_ = false;
    this.bookService.toggleFavoriteState(this.bookKey()  ?? '');
    this.messageService.add({ 
      severity: 'success', 
      summary: 'Success', 
      detail: 'Book has been removed from your wishlist.' 
    });
  }

  closeConfirmationDialog() {
    this.isConfirmationDialogVisible = false;
  }

}
