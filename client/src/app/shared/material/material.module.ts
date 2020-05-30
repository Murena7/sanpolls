import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatFormFieldModule],
  exports: [MatButtonModule, MatDialogModule, MatFormFieldModule],
})
export class MaterialModule {}
