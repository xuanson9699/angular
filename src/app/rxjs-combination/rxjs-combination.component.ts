import { Component, OnInit } from '@angular/core';
import { combineLatest, delay, forkJoin, map, Observable, of } from 'rxjs';
import { PaginationService } from '../../service/pagination.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rxjs-combination',
  imports: [CommonModule],
  templateUrl: './rxjs-combination.component.html',
  styleUrl: './rxjs-combination.component.css',
})
export class RxjsCombinationComponent implements OnInit {

  vm$: Observable<{
    currentPage: number;
    currentSize: number;
    totalCount: number;
    currentOffset: number;
  }>;

  constructor(private paginationService: PaginationService) {
    // Kết hợp nhiều state từ service thành view model
    this.vm$ = combineLatest([
      this.paginationService.currentPage$,
      this.paginationService.currentSize$,
      this.paginationService.totalCount$,
      this.paginationService.currentOffset$,
    ]).pipe(
      map(([currentPage, currentSize, totalCount, currentOffset]) => {
        return {
          currentPage,
          currentSize,
          totalCount,
          currentOffset,
        };
      })
    );
  }
  ngOnInit(): void {
    this.handleExcuteForkJoin();
    // this.handleExcuteForkJoin2();
  }

  // forkJoin
  // callback (result) => { ... } chỉ được thực thi một lần duy nhất vi: 
  //   Cách hoạt động của forkJoin:

  // forkJoin chỉ kích hoạt khi tất cả các Observable đã hoàn thành.
  // Sau khi hoàn thành, nó sẽ phát ra một mảng chứa kết quả cuối cùng của từng Observable.
  // Callback trong subscribe hoặc next chỉ xử lý một lần duy nhất với kết quả được tổng hợp.
  // Cách kết hợp các kết quả:

// Mỗi Observable trong mảng (ở đây là getAccountDropdown, getDepartmentDropdown, getStoreDropdown) sẽ thực hiện độc lập, 
// nhưng chỉ khi tất cả chúng hoàn thành thì callback trong subscribe mới được gọi.


// Khi nào nên dùng forkJoin?
// Khi bạn muốn đợi tất cả các Observable hoàn thành trước khi xử lý kết quả cuối cùng.
// Thích hợp cho các tác vụ phụ thuộc nhiều dữ liệu, ví dụ:
// Lấy danh sách tài khoản, phòng ban, và cửa hàng trước khi hiển thị giao diện.
  handleExcuteForkJoin() {
    forkJoin(
      [
        this.apiService.getAccountDropdown(),
        this.apiService.getDepartmentDropdown(),
        this.apiService.getStoreDropdown(),
      ],
      (accountList, departmentList, storeList) => {
        return {
          accounts: accountList,
          departments: departmentList,
          stores: storeList,
        };
      }
    ).subscribe({
      next: (result: any) => {
        console.log('Received data:', result);
      },
      error: (err: any) => {
        console.error('Error occurred:', err);
      },
      complete: () => {
        console.log('All observables completed.');
      },
    });
  }

  handleExcuteForkJoin2() {
    forkJoin(
      [
        of('Account data').pipe(delay(1000)),
        of('Department data').pipe(delay(3000)),
        of('Store data').pipe(delay(2000)),
      ]
    ).subscribe({
      next: (result: any) => {
        console.log('Received data:', result);
      },
      error: (err: any) => {
        console.error('Error occurred:', err);
      },
      complete: () => {
        console.log('All observables completed.');
      },
    });
  }

  apiService = {
    getAccountDropdown() {
      return of(['account1', 'account2', 'account3']);
    },
    getDepartmentDropdown() {
      return of(['department1', 'department2', 'department3']);
    },
    getStoreDropdown() {
      return of(['store1', 'store2', 'store3']);
    },
  }


  // combineLatest

  onSizeChanged(newSize: number) {
    this.paginationService.updateSize(newSize);
  }

  // Phương thức thay đổi trang hiện tại
  onPageChanged(newPage: number) {
    this.paginationService.updatePage(newPage);
  }
}
