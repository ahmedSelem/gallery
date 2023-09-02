import { AlbumPhotoInterface } from "./album-photo-interface";

export interface albumInterface {
    title: string,
    description: string,
    albumCover: string,
    albumPhotos: AlbumPhotoInterface[],
    id: string,
}