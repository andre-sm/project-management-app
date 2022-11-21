import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { SharedModule } from '../shared/shared.module';
import { TeamCarouselComponent } from './components/team-carousel/team-carousel.component';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';

@NgModule({
  declarations: [WelcomeComponent, TeamCarouselComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    SharedModule,
    MdbCarouselModule
  ],
})
export class WelcomeModule {}
