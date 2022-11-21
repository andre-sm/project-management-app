import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AlertComponent } from './components/alert-component/alert-component.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    ConfirmModalComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    TranslateModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatSelectModule,
    DragDropModule,
    MatSlideToggleModule,
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    AlertComponent,
    LoadingSpinnerComponent,
    ConfirmModalComponent,
    TranslateModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatSelectModule,
    DragDropModule,
    MatSlideToggleModule,
    SearchComponent,
  ],
})
export class SharedModule {}
