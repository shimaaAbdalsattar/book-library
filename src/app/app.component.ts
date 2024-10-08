import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { Title } from '@angular/platform-browser';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ToastModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ){
    this.router.events.pipe().subscribe((val: any) => {
      const url = val['url'];
      if (url && val instanceof NavigationEnd) {
        // change page title with the route title prop
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        const title = route.snapshot.data['title'];
        if (title) {
          this.titleService.setTitle(
            title || "Books Library"
          )
        }
      }
    })
  }

}
