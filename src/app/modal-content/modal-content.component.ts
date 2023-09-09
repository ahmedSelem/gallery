import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-modal-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent {
  bsModalRef?: BsModalRef;

  constructor(private _bsModalService: BsModalService) { }

  openModal() {
    this.bsModalRef = this._bsModalService.show(ModalComponent);
    this.bsModalRef.content.recivedData = 'Selem';
  }
}
