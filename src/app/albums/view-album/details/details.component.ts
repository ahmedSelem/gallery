import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumService } from 'src/app/core/services/album.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { albumInterface } from 'src/app/core/interfaces/album-interface';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  id?: string;
  album?: albumInterface;
  albumCover?: string;
  isLoading: boolean = false;

  constructor(
    private _albumService: AlbumService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this._albumService.loadingChanged.subscribe((loadingValue)=> {
      this.isLoading = loadingValue;
    });

    this._activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });

    this._albumService.fetchAlbumDetails(this.id!);
    this._albumService.albumObjSelect.subscribe((album) => {
      this.album = album!;
      this.albumCover = album?.albumCover;
    });
  }

  onSetCover(photoSelect: string) {
    this.album!.albumCover = photoSelect;
    this._albumService.editAlbum(this.album!, this.id!, 'viewPage');
  }
  
  onDeletePhoto(photoIndex: number) {
    this.album?.albumPhotos.splice(photoIndex, 1);
    this._albumService.editAlbum(this.album!, this.id!, 'viewPage');  
  }
}
