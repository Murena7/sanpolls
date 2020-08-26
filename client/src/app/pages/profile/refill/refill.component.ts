import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  BillCallbackStatus,
  Currency,
  IBill,
  IBillCreateBody,
  IBillCreateResponse,
  PayType,
  Status,
} from '../../../core/entities/bill/bill.types';
import { SnackbarNotificationService } from '../../../core/common-services/snackbar-notification.service';
import { BillService } from '../../../core/api-services/bill.service';
import { WindowSizeService } from '../../../core/api-services/window-size.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { switchMap } from 'rxjs/operators';
import { PayStep } from './refill.types';
import { UserService } from '../../../core/api-services/user.service';
import { forkJoin, of } from 'rxjs';

@Component({
  selector: 'san-refill',
  templateUrl: './refill.component.html',
  styleUrls: ['./refill.component.scss'],
})
export class RefillComponent implements OnInit {

  payStep = PayStep;
  payStepValue = this.payStep.calculator;
  obmenkaPostFormData: IBillCreateResponse;

  billHistory: IBill[] = [];
  ColumnMode = ColumnMode;
  billStatus = Status;
  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;

  readonly headerHeight = 50;
  readonly rowHeight = 50;

  refillForm = this.fb.group({
    count: [100, [Validators.min(1), Validators.required]],
  });

  constructor(
    private route: ActivatedRoute,
    private snackbarNotificationService: SnackbarNotificationService,
    private billService: BillService,
    public windowSizeService: WindowSizeService,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.checkCallbackQueryStatus();
    this.billService.history().subscribe((res) => {
      this.billHistory = res;
    });
  }

  removeBill(billId: string) {
    this.billService
      .removeById(billId)
      .pipe(switchMap((x) => this.billService.history()))
      .subscribe((res) => {
        this.billHistory = res;
        this.snackbarNotificationService.successfully('Удалено');
      });
  }

  checkBillStatus(billId: string) {
    this.billService
      .checkBillStatusObmenka(billId)
      .pipe(
        switchMap((x) => {
          return forkJoin({
            user: x.data.status === Status.FINISHED ? this.userService.refreshUserData() : of(true),
            billHistory: this.billService.history(),
          });
        })
      )
      .subscribe((res) => {
        this.billHistory = res.billHistory;
      });
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {}

  checkCallbackQueryStatus() {
    if (this.route.snapshot.queryParams?.status) {
      const status = this.route.snapshot.queryParams.status;

      switch (status) {
        case BillCallbackStatus.success:
          this.snackbarNotificationService.successfully('Оплата Успешна - Ожидайте!');
          break;
        case BillCallbackStatus.fail:
          this.snackbarNotificationService.error('Оплата не завершилась');
      }
    }
  }

  formSubmit() {
    if (this.refillForm.invalid) {
      return;
    }

    this.payStepValue = this.payStep.list;
  }

  payObmenka() {
    const body: IBillCreateBody = {
      payType: PayType.Obmenka,
      amount: this.refillForm.get('count').value,
      currency: Currency.RUR,
    };

    this.billService.create(body).subscribe((res) => {
      this.obmenkaPostFormData = res;
      this.payStepValue = this.payStep.obmenka;
    });
  }
}
