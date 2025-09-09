import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { HospitalsService } from '../../services/hospitals.service';
import { HospitalListResponse } from '../../models/hospital-response.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-hospital-list',
  templateUrl: './hospital-list.component.html',
  styleUrls: ['./hospital-list.component.scss'],
})
export class HospitalListComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'name', 'landlineNumber', 'actions'];
  dataSource = new MatTableDataSource<HospitalListResponse>();
  pagination = {
    pageNumber: 1,
    pageSize: 10,
    totalRecords: 0,
  };
  isLoading = false;

  private destroy$ = new Subject<void>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly router: Router,
    private readonly hospitalsService: HospitalsService,
    private readonly dialog: MatDialog,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllHospitals();
  }

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: PageEvent) => {
        this.pagination.pageNumber = event.pageIndex + 1;
        this.pagination.pageSize = event.pageSize;
        this.getAllHospitals();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getAllHospitals() {
    this.isLoading = true;

    this.hospitalsService
      .getAll(this.pagination.pageNumber, this.pagination.pageSize)
      .subscribe({
        next: (response) => {
          this.dataSource.data = response.data;
          this.pagination.totalRecords = response.totalRecords;
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  goToEditHospital(id: number) {
    this.router.navigate(['/hospitals/edit', id]);
  }

  deleteHospital(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmação',
        message: 'Tem certeza que deseja deletar este hospital?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.hospitalsService.delete(id).subscribe(() => {
          this.messageService.success('Hospital deletado com sucesso!');
          this.getAllHospitals();
        });
      }
    });
  }
}
