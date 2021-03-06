import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddVoiceComponent } from '@pages/sanadmin/users/modals/add-voice/add-voice.component';
import { UsersComponent } from '@pages/sanadmin/users/users.component';
import { SharedModule } from '@shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MaterialModule } from '@shared/material/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AddVoiceComponent, UsersComponent],
  imports: [CommonModule, SharedModule, NgxDatatableModule, MaterialModule, RouterModule],
  entryComponents: [AddVoiceComponent]
})
export class UsersModule {}
