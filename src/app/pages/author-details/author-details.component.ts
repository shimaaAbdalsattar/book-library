import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Author } from '../../shared/services/Types';
import { QueryService } from '../../shared/services/query.service';
import { ActivatedRoute } from '@angular/router';
import { apiBase } from '../../shared/services/constants';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [CommonModule,
    LoaderComponent
  ],
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.scss'
})
export class AuthorDetailsComponent {
  private destroy$ = new Subject<void>();
  private authorKey:string|null = '';
  isLoading:boolean = true;
  authorDetails: Author|null = null;
  authorPhotoBaseURL: string = environment.authorPhotoBaseUrl;
  authorPhotoID:string='';
  authorSubjects:string[] = [];

  constructor(
    private route:ActivatedRoute,
    private queryService:QueryService
  ){
    this.authorKey = this.route.snapshot.paramMap.get('key');
    console.log(`${apiBase}${this.authorKey}.json`);
    this.queryService.get(`${apiBase}${this.authorKey}.json`).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res)=> {
        this.authorDetails = res;
        this.authorPhotoID = this.authorDetails?.key.split("/")[2] ?? '';
        if(this.authorDetails?.alternate_names){
          this.authorSubjects = this.authorDetails?.alternate_names.slice(0, 5) ?? [];
        }
        this.isLoading = false;
        console.log(this.authorDetails);
      },
      error: (er)=> {
        this.isLoading = false;
        this.authorDetails = null;
      }
   });
  }

  // set the default image when an error occurs
  setDefaultImage(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/imgs/profile.jpg';  // I will use the logo but instead we have to get a default image
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
