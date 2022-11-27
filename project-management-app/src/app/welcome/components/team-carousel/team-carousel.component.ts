import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, Subscription, tap } from 'rxjs';

import { TeamCarouselService } from './services/team-carousel.service';

@Component({
  selector: 'app-team-carousel',
  templateUrl: './team-carousel.component.html',
  styleUrls: ['./team-carousel.component.scss'],
})
export class TeamCarouselComponent implements OnInit, OnDestroy {
  langChangedSub!: Subscription;

  slides = new Array(3).fill({ id: -1, src: '', title: '', subtitle: '' });

  activeSlide: number = 0;

  smallDevice$!: Observable<boolean>;

  @ViewChild('carouselWrapper') carousel!: ElementRef<HTMLElement>;

  caption = {
    title: '',
    subtitle: '',
  };

  carouselWrapper: any;

  constructor(
    private translate: TranslateService,
    private teamCarouselService: TeamCarouselService,
  ) {}

  ngOnInit(): void {
    this.slides[0] = {
      id: 0,
      src: './assets/img/img/slide0.png',
      title: this.translate
        .get('WELCOME.carousel.slides.slide0.title')
        .pipe(tap((data) => data)),
      subtitle: this.translate
        .get('WELCOME.carousel.slides.slide0.subtitle')
        .pipe(tap((data) => data)),
    };
    this.slides[1] = {
      id: 1,
      src: './assets/img/img/slide1.png',
      title: this.translate
        .get('WELCOME.carousel.slides.slide1.title')
        .pipe(tap((data) => data)),
      subtitle: this.translate
        .get('WELCOME.carousel.slides.slide1.subtitle')
        .pipe(tap((data) => data)),
    };
    this.slides[2] = {
      id: 2,
      src: './assets/img/img/slide2.png',
      title: this.translate
        .get('WELCOME.carousel.slides.slide2.title')
        .pipe(tap((data) => data)),
      subtitle: this.translate
        .get('WELCOME.carousel.slides.slide2.subtitle')
        .pipe(tap((data) => data)),
    };
    this.langChangedSub = this.teamCarouselService.languageChanged$.subscribe(
      () => {
        this.slides.forEach((slide, i) => {
          this.slides[i].title = this.translate.get(
            `WELCOME.carousel.slides.slide${i}.title`,
          );
          this.slides[i].subtitle = this.translate.get(
            `WELCOME.carousel.slides.slide${i}.subtitle`,
          );
        });
      },
    );
    this.checkIfSmall();
    window.addEventListener('resize', () => {
      this.checkIfSmall();
    });
  }

  ngOnDestroy(): void {
    this.langChangedSub.unsubscribe();
  }

  onSlideChange(): void {
    const activeId = +(this.carousel.nativeElement
      .querySelector('.active')
      ?.getAttribute('aria-id') as string);
    if (activeId === 2) {
      this.activeSlide = 0;
    } else {
      this.activeSlide = activeId + 1;
    }
    this.caption.title = `WELCOME.carousel.slides.slide${this.activeSlide}.title`;
    this.caption.subtitle = `WELCOME.carousel.slides.slide${this.activeSlide}.subtitle`;
  }

  checkIfSmall() {
    if (window.screen.width <= 767) {
      this.smallDevice$ = of(true);
      this.smallDevice$.subscribe((val) => {
        if (val) {
          this.caption.title = `WELCOME.carousel.slides.slide${this.activeSlide}.title`;
          this.caption.subtitle = `WELCOME.carousel.slides.slide${this.activeSlide}.subtitle`;
        }
      });
    } else {
      this.smallDevice$ = of(false);
    }
  }
}
