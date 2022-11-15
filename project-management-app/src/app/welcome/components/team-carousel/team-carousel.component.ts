import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, tap } from 'rxjs';
import { TeamCarouselService } from './services/team-carousel.service';

@Component({
  selector: 'app-team-carousel',
  templateUrl: './team-carousel.component.html',
  styleUrls: ['./team-carousel.component.scss']
})
export class TeamCarouselComponent implements OnInit {
  langChangedSub!: Subscription;
  slides = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});
  constructor(private translate: TranslateService, private store: Store, private teamCarouselService: TeamCarouselService) {}

  ngOnInit(): void {
    this.slides[0] = {
      id: 0,
      src: './assets/img/img/slide0.png',
      title: this.translate.get('WELCOME.carousel.slides.slide0.title')
      .pipe(tap((data) => data)),
      subtitle: this.translate.get('WELCOME.carousel.slides.slide0.subtitle')
      .pipe(tap((data) => data)),
    }
    this.slides[1] = {
      id: 1,
      src: './assets/img/img/slide1.png',
      title: this.translate.get('WELCOME.carousel.slides.slide1.title')
      .pipe(tap((data) => data)),
      subtitle: this.translate.get('WELCOME.carousel.slides.slide1.subtitle')
      .pipe(tap((data) => data)),
    }
    this.slides[2] = {
      id: 2,
      src: './assets/img/img/slide2.png',
      title: this.translate.get('WELCOME.carousel.slides.slide2.title')
      .pipe(tap((data) => data)),
      subtitle: this.translate.get('WELCOME.carousel.slides.slide2.subtitle')
      .pipe(tap((data) => data)),
    }
    this.langChangedSub = this.teamCarouselService.languageChanged$.subscribe(
        ()=>{
          this.slides.forEach((slide, i) => {
            slide.title = this.translate.get(`WELCOME.carousel.slides.slide${i}.title`)
            slide.subtitle = this.translate.get(`WELCOME.carousel.slides.slide${i}.subtitle`)
          })
        }
      )
  }
}
