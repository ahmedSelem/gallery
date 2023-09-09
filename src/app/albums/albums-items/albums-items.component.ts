import { PlaceholderComponent } from './../../shared/placeholder/placeholder.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { albumInterface } from 'src/app/core/interfaces/album-interface';
import { AlbumService } from 'src/app/core/services/album.service';
import { ItemComponent } from './item/item.component';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-albums-items',
  standalone: true,
  imports: [CommonModule, RouterModule, ItemComponent, PlaceholderComponent],
  templateUrl: './albums-items.component.html',
  styleUrls: ['./albums-items.component.scss'],
})
export class AlbumsItemsComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();
  albumsList: albumInterface[] = [];
  subscription?: Subscription;
  isLoading: boolean = false;

  constructor(
    private _albumService: AlbumService,
    private _loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this._albumService.fetchAlbums();
    this._albumService.albumChanging
      .pipe(takeUntil(this.destroy))
      .subscribe((albums) => {
        this.albumsList = albums;
      });

    this._loadingService.isLoading
      .pipe(takeUntil(this.destroy))
      .subscribe((value) => {
        this.isLoading = value;
      });
  }
  
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
