import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { readAndCompressImage } from "browser-image-resizer";
import { finalize, Observable } from 'rxjs';
import { imageConfig } from '../../utils/imageConfig';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  task: AngularFireUploadTask;

  constructor(
    private storage: AngularFireStorage
  ) { }

  async getResizedImage(file) {

    let resizedImage = await readAndCompressImage(file, imageConfig);
    return resizedImage;
  }

  uploadImage(image, filename) {
    return this.storage.upload(filename, image);
  }

  getFileReference(filename) {
    return this.storage.ref(filename);
  }
}
