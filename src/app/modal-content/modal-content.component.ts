import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from './modal/modal.component';
import { UserInterface } from '../core/interfaces/user';

@Component({
  selector: 'app-modal-content',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
})
export class ModalContentComponent {
  users: UserInterface [] = [
    { bookedName: 'Ahmed Selem', iAttended: true, isBooked: false },
    { bookedName: 'Selem Ahmed', iAttended: false, isBooked: true },
    { bookedName: 'Mahmoud Selem', iAttended: true, isBooked: true },
    { bookedName: 'Mahmoud', iAttended: false, isBooked: false },
    { bookedName: 'A Selem', iAttended: true, isBooked: true },
    { bookedName: 'B Ahmed', iAttended: false, isBooked: false },
    { bookedName: 'C Selem', iAttended: false, isBooked: true },
    { bookedName: 'D', iAttended: false, isBooked: true },
  ];

  constructor(private _bsModalService: BsModalService) {}

  openModal(Users: any[] = this.users) {

    const initialState = { users: Users};
    this._bsModalService.show(ModalComponent, {
      class: 'modal-md',
      initialState,
    });

    /////******************* Another solution
    // this._bsModalService.show(
    //   ModalComponent,
    //   Object.assign({ class: 'modal-md', initialState })
    // );
  }


}
