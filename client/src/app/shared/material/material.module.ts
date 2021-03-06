import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRippleModule } from '@angular/material/core';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    MatSelectModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatRippleModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    TextFieldModule,
    MatProgressBarModule,
  ],
  exports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatRippleModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    TextFieldModule,
    MatProgressBarModule,
  ],
})
export class MaterialModule {}
