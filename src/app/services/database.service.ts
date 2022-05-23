import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ToastrService } from 'ngx-toastr';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private db: AngularFireDatabase,
    private toast: ToastrService
  ) { }

  addUserToDb(uid: string, name: string, username: string, country: string, bio: string, picture: string) {
    return this.db.object(`/users/${uid}`).set(
      {
        name: name,
        username: username,
        bio: bio,
        country: country,
        picture: picture
      }
    );
  }

  addPostToDb(description: string, location: string, image: string, instaId: string, by: string, userId: string) {

    let uid = uuidv4();

    return this.db.object(`/posts/${uid}`).set(
      {
        id: uid,
        description: description,
        location: location,
        image: image,
        instaId: instaId,
        uploadTime: Date.now(),
        by: by,
        userId: userId
      }
    );
  }

  getUserFromDb(uid: string) {
    return this.db.object(`users/${uid}`);
  }

  getUsersList() {
    return this.db.object(`users/`);
  }

  getPostsList() {
    return this.db.object(`posts/`);
  }

  getPostFromDb(uid: string) {
    return this.db.object(`posts/${uid}`);
  }

  votePost(vote: boolean, pid: string, uid: string) {
    this.db.object(`/posts/${pid}/vote/${uid}`).set(
      {
        vote: vote
      }
    );
  }
}
