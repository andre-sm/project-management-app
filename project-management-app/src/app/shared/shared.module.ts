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
import { InitialsPipe } from './pipes/initials.pipe';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';


@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    ConfirmModalComponent,
    SearchComponent,
    InitialsPipe,
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
    NgxMatColorPickerModule
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
    InitialsPipe,
    NgxMatColorPickerModule
  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
  ],
})
export class SharedModule {}
