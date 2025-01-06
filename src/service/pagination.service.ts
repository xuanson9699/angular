import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  // BehaviorSubjects để lưu trạng thái và phát giá trị mới
  private currentPageSubject = new BehaviorSubject<number>(1);
  private currentSizeSubject = new BehaviorSubject<number>(10);
  private totalCountSubject = new BehaviorSubject<number>(0);
  private currentOffsetSubject = new BehaviorSubject<number>(0);

  // Observable công khai để component subscribe
  currentPage$ = this.currentPageSubject.asObservable();
  currentSize$ = this.currentSizeSubject.asObservable();
  totalCount$ = this.totalCountSubject.asObservable();
  currentOffset$ = this.currentOffsetSubject.asObservable();

  constructor() {}

  // Cập nhật trang hiện tại
  updatePage(newPage: number) {
    if (newPage < 1) {
      return; // Đảm bảo trang không nhỏ hơn 1
    }
    const currentSize = this.currentSizeSubject.value;
    const offset = (newPage - 1) * currentSize;

    this.currentPageSubject.next(newPage);
    this.currentOffsetSubject.next(offset);
  }

  // Cập nhật kích thước trang
  updateSize(newSize: number) {
    if (newSize < 1) {
      return; // Đảm bảo kích thước lớn hơn 0
    }
    const currentPage = this.currentPageSubject.value;
    const offset = (currentPage - 1) * newSize;

    this.currentSizeSubject.next(newSize);
    this.currentOffsetSubject.next(offset);
  }

  // Cập nhật tổng số lượng phần tử
  updateTotalCount(totalCount: number) {
    this.totalCountSubject.next(totalCount);
  }

  // Reset toàn bộ trạng thái
  resetPagination() {
    this.currentPageSubject.next(1);
    this.currentSizeSubject.next(10);
    this.currentOffsetSubject.next(0);
    this.totalCountSubject.next(0);
  }
}
