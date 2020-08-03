import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPipe } from '@shared/pipes/error.pipe';

@NgModule({
  declarations: [ErrorPipe],
  imports: [CommonModule],
  exports: [ErrorPipe],
})
export class PipesModule {}
