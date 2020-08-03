import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventStatus, EventType } from '../../../../../core/entities/poll-event/poll-event.types';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICreateEditModalData } from '../../polls.types';

@Component({
  selector: 'san-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss'],
})
export class CreateEditComponent implements OnInit {
  eventStatus = EventStatus;
  eventType = EventType;
  isEdit = false;

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    message: ['', [Validators.required]],
    endMessage: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    status: [this.eventStatus.Inactive, [Validators.required]],
    type: [this.eventType.Infinite, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ICreateEditModalData,
    private dialogRef: MatDialogRef<CreateEditComponent>
  ) {}

  ngOnInit(): void {
    if (this.data?.isEdit) {
      this.initEditForm();
      this.isEdit = true;
    }
  }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  initEditForm() {
    const formData = { ...this.data.data };
    Reflect.deleteProperty(formData, 'id');
    Reflect.deleteProperty(formData, 'createdAt');
    Reflect.deleteProperty(formData, 'updatedAt');
    this.form.setValue({ ...formData });
  }
}
