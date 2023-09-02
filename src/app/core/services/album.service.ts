import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { albumInterface } from '../interfaces/album-interface';
import { ToastService } from './toast.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  private urlAPI: string = 'https://64e7771bb0fd9648b78ffdb8.mockapi.io/api/v1';
  private albumsList: albumInterface[] = [];
  albumChanging = new Subject<albumInterface[]>();
  albumObjSelect = new BehaviorSubject<albumInterface | null>(null);
  loadingChanged = new Subject<boolean>();

  constructor(
    private _httpClient: HttpClient,
    private _toastService: ToastService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  fetchAlbums() {
    this._httpClient.get<albumInterface[]>(`${this.urlAPI}/albums`).subscribe({
      next: (response) => {
        this.albumsList = response;
        this.albumChanging.next(this.albumsList);
        this.loadingChanged.next(false);
      },
      error: (_) => {
        this._toastService.errorShow('Error Has Occurred');
        this.loadingChanged.next(false);
      },
    });
  }

  addNewAlbum(formData: any) {
    this._httpClient.post(`${this.urlAPI}/albums`, formData).subscribe({
      next: (response) => {
        console.log(response);
        this._toastService.successShow('Added Successfully');
        this._router.navigate(['./']);
        this.loadingChanged.next(false);
      },
      error: (_) => {
        this._toastService.errorShow('Error Has Occurred');
        this.loadingChanged.next(false);
      },
    });
  }

  editAlbum(formData: albumInterface, id: string, typeRoute?: string) {
    this._httpClient.put(`${this.urlAPI}/albums/${id}`, formData).subscribe({
      next: (_) => {
        if (typeRoute !== 'viewPage') {
          this._toastService.successShow('Edit Successfully');
          this._router.navigate(['./']);
          this.loadingChanged.next(false);
        }
      },
      error: (_) => {
        this._toastService.errorShow('Error Has Occurred');
        this.loadingChanged.next(false);
      },
    });
  }

  fetchAlbumDetails(id: string) {
    this._httpClient
      .get<albumInterface>(`${this.urlAPI}/albums/${id}`)
      .subscribe({
        next: (response) => {
          this.albumObjSelect.next(response);
          this.loadingChanged.next(false);

        },
        error: (_) => {
          this._toastService.errorShow('Error Has Occurred');
         this.loadingChanged.next(false);
        },
      });
  }

  albumSelected(album: albumInterface) {
    this.albumObjSelect.next(album);
  }
}
