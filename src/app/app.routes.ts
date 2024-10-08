import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () =>
            import('./pages/home/home.component').then(
                (c) => c.HomeComponent
            ),
        data: { title: 'Home - Books Library' },
    },
    {
        path: 'book-details/:key',
        loadComponent: () =>
            import('./pages/book-details/book-details.component').then(
                (c) => c.BookDetailsComponent
            ),
        data: { title: 'Details - Books Library' },
    },
    {
        path: 'author-details/:key',
        loadComponent: () =>
            import('./pages/author-details/author-details.component').then(
                (c) => c.AuthorDetailsComponent
            ),
        data: { title: 'Details - Books Library' },
    },
    {
        path: 'wishlist',
        loadComponent: () =>
            import('./pages/wishlist/wishlist.component').then(
                (c) => c.WishlistComponent
            ),
        data: { title: 'Wishlist - Books Library' },
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
    }
];
