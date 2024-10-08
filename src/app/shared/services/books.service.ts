import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Book } from './Types'; 
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private fallbackStorage: { [key: string]: string } = {};

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  setBooksList(books : Book[]){
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem("booksList",JSON.stringify(books));
    } else {
      this.fallbackStorage["booksList"] = JSON.stringify(books);  // Use an in-memory fallback on the server
    }
  }

  getBooks () : Book[]{
    if (isPlatformBrowser(this.platformId)) {
      if(sessionStorage.getItem("booksList")){
        return JSON.parse(sessionStorage.getItem("booksList")!);
      }
      return [];
    }
    return [];
  }

  getBookByKey (key : string) : Book|null{
    if (isPlatformBrowser(this.platformId)) {
      if(sessionStorage.getItem("booksList")){
        return JSON.parse(sessionStorage.getItem("booksList")!).find((b:Book) => b.key === key);
      }
      return null;
    } 
    return JSON.parse(this.fallbackStorage["booksList"]) || null;
  }

  toggleFavoriteState (key : string){
    if (isPlatformBrowser(this.platformId)) {
      let currentBooksList = this.getBooks();
      let bookIndex = currentBooksList.findIndex((b: Book) => b.key === key);
      currentBooksList[bookIndex].isFav = !currentBooksList[bookIndex].isFav;
      this.setBooksList(currentBooksList);
    }
  }

  getWishlist(): Book[]{
    let currentBooksList = this.getBooks();
    return currentBooksList.filter((book:Book) => book.isFav);
  }
  
}