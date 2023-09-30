import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { UserInterface } from 'src/app/core/interfaces/user';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';
import { LoadingService } from 'src/app/core/services/loading.service';
import { Subject, takeUntil } from 'rxjs';
import { AlbumService } from 'src/app/core/services/album.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  users!: UserInterface[];
  albums!: any[];
  userForm!: FormGroup;
  destroy = new Subject<void>();
  isLoading: boolean = false;
  
  constructor(
    public _bsModalRef: BsModalRef,
    private _loadingService: LoadingService,
    private _albumService: AlbumService
  ) {}

  ngOnInit(): void {
    console.log(this.users);
    this.userForm = new FormGroup({
      items: new FormArray([]),
    });

    this._loadingService.isLoading
      .pipe(takeUntil(this.destroy))
      .subscribe((value) => {
        this.isLoading = value;
      });

    //====> Data From APi
    this._albumService.fetchAlbums();
    this._albumService.albumChanging.subscribe((album) => {
      this.albums = album;
      console.log(this.albums);
      this.populateFormArray(this.users);
    });
  }

  populateFormArray(data: UserInterface[]) {
    const itemsArray = this.userForm.get('items') as FormArray;
    data.forEach((item) => {
      const group = new FormGroup({
        isAttend: new FormControl(item.iAttended),
        isBooked: new FormControl(item.isBooked),
      });
      itemsArray.push(group);
    });
  }

  onSubmit() {
    const userUpdated = this.mergeNewArrToOldArr(
      this.userForm.value.items,
      this.users
    );
    console.log(userUpdated);
  }

  mergeNewArrToOldArr(
    formArray: any[],
    apiArray: UserInterface[]
  ): UserInterface[] {
    let newArr: UserInterface[] = [];
    formArray.forEach((value, index) => {
      const oldValue = apiArray[index];
      const obj = {
        bookedName: oldValue.bookedName,
        iAttended: value.isAttend,
        isBooked: value.isBooked,
      };
      newArr.push(obj);
    });

    return newArr;
  }

  onClose() {
    this._bsModalRef.hide();
  }

  // mergeNewArrToOldArr(
  //   formArray: any[],
  //   apiArray: UserInterface[]
  // ): UserInterface[] {
  //   let newArr: UserInterface[] = [];

  //   for (let i = 0; i < formArray.length; i++) {
  //     const formItem = formArray[i];
  //     const apiItem = apiArray[i];

  //     const obj = {
  //       bookedName: apiItem.bookedName,
  //       iAttended: formItem.isAttend,
  //       isBooked: formItem.isBooked,
  //     };
  //     newArr.push(obj);
  //   }

  //   return newArr;
  // }
}
