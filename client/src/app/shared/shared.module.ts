import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from './navbar/navbar.module';
import { ComponentsModule } from '@components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '@shared/pipes/pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavbarModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    FontAwesomeModule,
  ],
  exports: [NavbarModule, ComponentsModule, FormsModule, ReactiveFormsModule, PipesModule, FontAwesomeModule],
})
export class SharedModule {}
