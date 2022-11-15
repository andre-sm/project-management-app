import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { SharedModule } from '../shared/shared.module';
import { CarouselModule } from '@coreui/angular';
import { TeamCarouselComponent } from './components/team-carousel/team-carousel.component';

@NgModule({
  declarations: [WelcomeComponent, TeamCarouselComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    SharedModule,
    CarouselModule,
  ],
})
export class WelcomeModule {}
