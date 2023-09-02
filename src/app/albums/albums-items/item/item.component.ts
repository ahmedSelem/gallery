import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { albumInterface } from 'src/app/core/interfaces/album-interface';
import { NumberPhotosPipe } from 'src/app/core/pipes/number-photos.pipe';
import { RouterModule } from '@angular/router';
import { AlbumService } from 'src/app/core/services/album.service';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule, RouterModule, NumberPhotosPipe],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() albumObj?: albumInterface;

  constructor (private _albumService: AlbumService) {}

  onSlectAlbum() {
    this._albumService.albumSelected(this.albumObj!);
  }
}
