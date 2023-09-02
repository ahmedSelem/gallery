import { PlaceholderComponent } from './../../shared/placeholder/placeholder.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { albumInterface } from 'src/app/core/interfaces/album-interface';
import { AlbumService } from 'src/app/core/services/album.service';
import { ItemComponent } from './item/item.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-albums-items',
  standalone: true,
  imports: [CommonModule, RouterModule, ItemComponent, PlaceholderComponent],
  templateUrl: './albums-items.component.html',
  styleUrls: ['./albums-items.component.scss']
})
export class AlbumsItemsComponent implements OnInit, OnDestroy {
  albumsList: albumInterface[] = [];
  subscription?: Subscription;
  isLoading: boolean = false;

  constructor(private _albumService: AlbumService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this._albumService.fetchAlbums();
    this.subscription = this._albumService.albumChanging.subscribe((albums) => {
      this.albumsList = albums;
    });

    this.subscription = this._albumService.loadingChanged.subscribe((loadingValue)=> {
      this.isLoading = loadingValue;
    })

  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
