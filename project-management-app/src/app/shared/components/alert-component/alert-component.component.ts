import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alert-component',
  templateUrl: './alert-component.component.html',
  styleUrls: ['./alert-component.component.scss'],
})
export class AlertComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string | null) {}
}
