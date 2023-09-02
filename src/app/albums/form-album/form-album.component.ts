import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploaderModule } from 'angular-uploader';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Uploader, UploadWidgetConfig, UploadWidgetResult } from 'uploader';

import { AlbumService } from 'src/app/core/services/album.service';
import {  ActivatedRoute, RouterModule } from '@angular/router';
import { albumInterface } from 'src/app/core/interfaces/album-interface';
import { AlbumPhotoInterface } from 'src/app/core/interfaces/album-photo-interface';
import { Subscription } from 'rxjs';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';

@Component({
  selector: 'app-form-album',
  standalone: true,
  imports: [CommonModule, UploaderModule, ReactiveFormsModule, RouterModule, LoadingComponent],
  templateUrl: './form-album.component.html',
  styleUrls: ['./form-album.component.scss'],
})
export class FormAlbumComponent {
  uploader = Uploader({ apiKey: 'public_W142iDLbbFmk1h9jhPA4oac3tJcj' });
  height = '375px';
  imagesList: AlbumPhotoInterface[] = [];
  filesResult: any[] = [];
  submitForm?: FormGroup;
  albumEditing?: albumInterface;
  editMode?: boolean = false;
  isLoading: boolean = false;
  subscription?: Subscription;
  
  constructor(
    private _albumService: AlbumService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this._activatedRoute.params.subscribe((params) => {
      if(params['id']) {
        this.editMode = true;
        this._albumService.albumObjSelect.subscribe((albumSelect) => {
          this.albumEditing = albumSelect!;
        });
      }
    });


    this.subscription = this._albumService.loadingChanged.subscribe((loadingValue)=> {
      this.isLoading = loadingValue;
    });

    this.submitForm = new FormGroup({
      title: new FormControl(
        this.albumEditing ? this.albumEditing.title : null,
        [Validators.required, Validators.maxLength(300)]
      ),
      description: new FormControl(
        this.albumEditing ? this.albumEditing.description : null,
        [Validators.required, Validators.maxLength(2000)]
      ),
    });


  }

  options: UploadWidgetConfig = {
    multi: true,
    maxFileSizeBytes: 100000,
    showRemoveButton: false,
  };

  onUpdate = (files: UploadWidgetResult[]) => {
    this.filesResult = files;
  };

  onSubmit() {
    this.isLoading = true;
    this.filesResult.map((x) => {
      const imgUrl = x.fileUrl;
      this.imagesList.push({ imageUrl: imgUrl, caption: '' });
    });

    if (this.albumEditing) {
      let PhotosAfterChange: any[] = [
        ...this.imagesList,
        ...this.albumEditing.albumPhotos,
      ];
      const formData: any = {
        title: this.submitForm!.value.title,
        description: this.submitForm!.value.description,
        albumPhotos: PhotosAfterChange,
        albumCover: PhotosAfterChange[0].imageUrl,
      };
      this._albumService.editAlbum(formData, this.albumEditing.id);
    } else {
      const formData: any = {
        title: this.submitForm!.value.title,
        description: this.submitForm!.value.description,
        albumPhotos: this.imagesList,
        albumCover: this.imagesList[0].imageUrl,
      };
      this._albumService.addNewAlbum(formData);
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
