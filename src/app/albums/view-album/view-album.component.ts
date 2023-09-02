import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-album',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-album.component.html',
  styleUrls: ['./view-album.component.scss'],
})
export class ViewAlbumComponent{
}
