import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadWidgetConfig, UploadWidgetResult, Uploader } from 'uploader';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';

import { albumInterface } from 'src/app/core/interfaces/album-interface';
import { AlbumPhotoInterface } from 'src/app/core/interfaces/album-photo-interface';
import { AlbumService } from 'src/app/core/services/album.service';
import { UploaderModule } from 'angular-uploader';

@Component({
  selector: 'app-form-photo',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, UploaderModule],
  templateUrl: './form-photo.component.html',
  styleUrls: ['./form-photo.component.scss'],
})
export class FormPhotoComponent {
  uploader = Uploader({ apiKey: 'public_W142iDLbbFmk1h9jhPA4oac3tJcj' });
  height = '375px';
  id?: string;
  imagesList: AlbumPhotoInterface[] = [];
  filesResult: any[] = [];
  submitForm?: FormGroup;
  isAlbumCover: boolean = false;
  album?: albumInterface;
  editMode: boolean = false;
  imageSelect?: string;
  imageIndex?: number;

  constructor(
    private _albumService: AlbumService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params: Params) => {
      this.id = params['id'];
      if (params['index']) {
        this.editMode = true;
        this.imageIndex = params['index'];
      }
    });

    this._albumService.fetchAlbumDetails(this.id!);
    this._albumService.albumObjSelect.subscribe((album) => {
      this.album = album!;
      this.imagesList = this.album?.albumPhotos!;
    });

    this.submitForm = new FormGroup({
      caption: new FormControl(this.editMode ? this.album?.title : null, [
        Validators.maxLength(300),
      ]),
      setAlbumCover: new FormControl(this.isAlbumCover),
    });
    
    if (this.editMode) {
      this.imageSelect = this.album?.albumPhotos[this.imageIndex!].imageUrl;
    }
  }

  options: UploadWidgetConfig = {
    maxFileSizeBytes: 100000,
    showRemoveButton: false,
  };

  onUpdate = (files: UploadWidgetResult[]) => {
    this.filesResult = files;
    if (this.editMode) {
      this.filesResult.map((x) => {
        const imgUrl = x.fileUrl;
        this.imageSelect = imgUrl;
      });
    }
  };

  onSubmit() {
    this.filesResult.map((x) => {
      const imgUrl = x.fileUrl;
      let newImgObj: AlbumPhotoInterface = {
        imageUrl: imgUrl,
        caption: this.submitForm?.value.caption,
      };
      if (this.editMode) {
        this.imagesList.splice(this.imageIndex!, 1, newImgObj);
      } else {
        this.imagesList.push(newImgObj);
      }
    });

    const formData: any = {
      title: this.album?.title,
      description: this.album?.description,
      albumPhotos: this.imagesList,
      albumCover: this.submitForm?.value.setAlbumCover
        ? this.imageSelect
        :  this.album?.albumCover,
    };
    this._albumService.editAlbum(formData, this.id!, 'formPhoto');
  }
}
