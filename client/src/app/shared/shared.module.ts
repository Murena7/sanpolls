import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from './navbar/navbar.module';
import { ComponentsModule } from '@components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '@shared/pipes/pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalsModule } from '@shared/modals/modals.module';
import { SatPopoverModule } from '@ncstate/sat-popover';

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
    ModalsModule,
    SatPopoverModule,
  ],
  exports: [
    NavbarModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    FontAwesomeModule,
    ModalsModule,
    SatPopoverModule,
  ],
})
export class SharedModule {}
