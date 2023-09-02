import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private _toastrService: ToastrService) { }

  errorShow (massage: string) {
    this._toastrService.error(massage,'', {
      timeOut: 1000,
    });
  };

  successShow (massage: string) {
    this._toastrService.success(massage,'', {
      timeOut: 1000,
    });
  };
}
