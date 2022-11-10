import { Component, Input } from '@angular/core';
import { Column } from '../../models';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input() column!: Column;
}
