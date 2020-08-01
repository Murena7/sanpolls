import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { LikeComponent } from '@components/like/like.component';

@NgModule({
  declarations: [LikeComponent],
  imports: [CommonModule, MaterialModule],
  exports: [LikeComponent],
})
export class LikeModule {}
