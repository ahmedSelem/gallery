import { Routes } from '@angular/router';
import { DetailsComponent } from './albums/view-album/details/details.component';
import { FormPhotoComponent } from './albums/view-album/form-photo/form-photo.component';
import { AlbumsItemsComponent } from './albums/albums-items/albums-items.component';

export const routes: Routes = [
  { path: '', redirectTo: 'albums', pathMatch: 'full' },
  {
    path: 'albums',
    title: 'Albums',
    loadComponent: () =>
      import('./albums/albums.component').then((c) => c.AlbumsComponent),
    children: [
      {
        path: '',
        component: AlbumsItemsComponent,
      },
      {
        path: 'view/:id',
        loadComponent: () =>
          import('./albums/view-album/view-album.component').then(
            (c) => c.ViewAlbumComponent
          ),
        children: [
          {
            path: '',
            component: DetailsComponent,
          },
          {
            path: 'editPhoto',
            component: FormPhotoComponent,
          },
          {
            path: 'addPhoto',
            component: FormPhotoComponent,
          },
        ],
      },

      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./albums/form-album/form-album.component').then(
            (c) => c.FormAlbumComponent
          ),
      },
      {
        path: 'add',
        loadComponent: () =>
          import('./albums/form-album/form-album.component').then(
            (c) => c.FormAlbumComponent
          ),
      },
    ],
  },
];
