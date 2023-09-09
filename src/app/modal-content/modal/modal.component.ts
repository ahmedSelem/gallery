import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
   recivedData?: string;
  constructor(public _bsModalRef: BsModalRef) { }


  ngOnInit(): void {
    console.log(this.recivedData!);
  }
  
  onClose() {
    this._bsModalRef.hide();
  }

}
